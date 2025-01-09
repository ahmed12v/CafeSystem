import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeService } from '../../servess/pages/employe.service';
import { BillService } from 'src/app/interfaces/athuntocation/signin';
import { EmpData } from '../../interfaces/pages/emp';
import { Order, respon } from '../../interfaces/pages/bill';
import { ToastrModule, ToastrService } from 'ngx-toastr';




declare var bootstrap: any; // Ensure Bootstrap types are available

@Component({
  selector: 'app-mangebills',
  standalone: true,
  imports: [ReactiveFormsModule ], 
  templateUrl: './mangebills.component.html',
  styleUrls: ['./mangebills.component.css'],
})
export class MangebillsComponent implements OnInit {
  @ViewChild('successToast', { static: false }) successToast!: ElementRef;
  

  constructor(
    private _EmployeService: EmployeService,
    private _BillService: BillService,
    private  Toast: ToastrService
  ) {}

  BillForm: FormGroup = new FormGroup({
    employeeName: new FormControl(null, [Validators.required]),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });

  empList!: EmpData[];
  spiner: boolean = false;
  come: boolean = false;
  showone!: respon;
  showtwo!: Order[];
  successMessage: string = '';
  errorMsg!: string;
  dataComee!:any;

  ngOnInit(): void {
    localStorage.setItem('last Page', '/bills');
  }

  getBill() {
    if (this.BillForm.valid) {
      this.spiner = true;
      this._BillService.getBill(this.BillForm.value).subscribe({
        next: (res) => {
          this.spiner = false;
          this.come = true;
          this.showone = res;
          this.showtwo = res.orders;
        },
        error: (err) => {
          this.spiner = false;
          console.error(err);
  
          // Set the error message or fallback to a default message
          this.errorMsg = err.error?.msg || 'An unexpected error occurred. Please try again.';
  
          // Display the error toast
          this.Toast.error(this.errorMsg, 'Error', {
            timeOut: 3000, // Toast will disappear after 3 seconds
            closeButton: true, // Add a close button to the toast
            progressBar: true, // Show a progress bar on the toast
          });
        },
      });
    } else {
      // If the form is invalid, show a warning toast
      this.Toast.warning('Please fill in all required fields.', 'Validation Error', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
      });
    }
  }
  

  markAsPaid() {
    const employeeName = this.BillForm.value.employeeName;
    this._BillService.markBillAsPaid(employeeName).subscribe({
      next: () => {
        this.successMessage = 'The bill has been marked as paid successfully!';
        this.showone.orders[0].paid = true;

        // Show the toast
        const toast = new bootstrap.Toast(this.successToast.nativeElement);
        toast.show();
      },
      error: (err) => {
        console.error('Error marking bill as paid:', err);
      },
    });
  }

  getEmps() {
    this.dataComee = true;
    this._EmployeService.getAllEmp().subscribe({
      next: (res) => {
        this.dataComee = false;
        this.empList = res.data;
        // console.log(this.empList);
      },
      error: (err) => {
        console.log(err);
        this.dataComee = false;
      },
    });
  }
}
