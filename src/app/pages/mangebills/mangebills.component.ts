import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeService } from '../../servess/pages/employe.service';
import { BillService } from '../../servess/pages/bill.service';
import { EmpData } from '../../interfaces/pages/emp';
import { Order, respon } from '../../interfaces/pages/bill';

declare var bootstrap: any; // Ensure Bootstrap types are available

@Component({
  selector: 'app-mangebills',
  standalone: true,
  imports: [ReactiveFormsModule], // Make sure ReactiveFormsModule is included
  templateUrl: './mangebills.component.html',
  styleUrls: ['./mangebills.component.css'],
})
export class MangebillsComponent implements OnInit {
  @ViewChild('successToast', { static: false }) successToast!: ElementRef;

  constructor(
    private _EmployeService: EmployeService,
    private _BillService: BillService
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
        },
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
}
