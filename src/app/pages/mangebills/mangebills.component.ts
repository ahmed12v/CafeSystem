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
import { ToastrService } from 'ngx-toastr';
import { BillServices } from 'src/app/servess/pages/bill.service';
import { catchError, EMPTY, finalize, map } from 'rxjs';

declare var bootstrap: any; // Ensure Bootstrap types are available

@Component({
  selector: 'app-mangebills',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './mangebills.component.html',
  styleUrls: ['./mangebills.component.css'],
})
export class MangebillsComponent implements OnInit {
  @ViewChild('successToast', { static: false }) successToast!: ElementRef;

  constructor(
    private _EmployeService: EmployeService,
    private _BillService: BillService,
    private billService: BillServices,
    private Toast: ToastrService
  ) {}

  BillForm: FormGroup = new FormGroup({
    employeeName: new FormControl(null, [Validators.required]),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });

  empList!: EmpData[];
  spiner: boolean = false;
  come: boolean = false;
  showOrders: any = [];
  totalBills: any;
  employeeName: any;
  successMessage: string = '';
  errorMsg!: string;
  dataComee!: any;
  startDate: string = '';
  endDate: string = '';
  orders: any[] = [];

  ngOnInit(): void {
    localStorage.setItem('last Page', '/bills');
  }

  getBill() {
    if (this.BillForm.valid) {
      const formData = {
        ...this.BillForm.value,
        startDate: this.formatDateToDDMMYYYY(this.BillForm.value.startDate),
        endDate: this.formatDateToDDMMYYYY(this.BillForm.value.endDate),
      };
      this.spiner = true;
      this._BillService
        .getBill(formData)
        .pipe(
          map((res: any) => {
            this.totalBills = res.totalBill;
            this.employeeName = res.employee;
            const flatOrders = res.orders
              .map((drink: any) => drink.drinks)
              .flat()
              .reduce((acc: any, item: any) => {
                const key = `${item.drinkId._id}-${item.price}`;
                if (!acc[key]) {
                  acc[key] = { ...item };
                } else {
                  acc[key].quantity += item.quantity;
                }
                return acc;
              }, {});
            return Object.values(flatOrders);
          }),
          finalize(() => {
            this.spiner = false;
          }),
          catchError((err) => {
            this.errorMsg =
              err.error?.msg ||
              'An unexpected error occurred. Please try again.';
            this.Toast.error(this.errorMsg, 'Error', {
              timeOut: 3000, // Toast will disappear after 3 seconds
              closeButton: true, // Add a close button to the toast
              progressBar: true, // Show a progress bar on the toast
            });
            return EMPTY;
          })
        )
        .subscribe({
          next: (res) => {
            this.come = true;
            this.showOrders = res;
          },
        });
    } else {
      // If the form is invalid, show a warning toast
      this.Toast.warning(
        'Please fill in all required fields.',
        'Validation Error',
        {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        }
      );
    }
  }

  payBill(employeeName: string): void {
    this.billService.markAsPaid(employeeName).subscribe({
      next: () => {
        this.showOrders[0].paid = true;
        this.Toast.success('The bill has been marked as paid successfully!');
      },
      error: (err) => {
        this.Toast.error('Failed to mark the bill as paid. Please try again.');
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

  formatDateToDDMMYYYY(date: string): string {
    const dateParts = date.split('-');
    if (dateParts.length === 3) {
      return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    }
    return date; // Return the same date if formatting fails
  }

  // Method to print the bill
  printBill() {
    window.print();
  }
}
