import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmployeService } from '../../servess/pages/employe.service';
import { EmpData } from '../../interfaces/pages/emp';
import { drinkRes } from '../../interfaces/drinks';
import { DrinkService } from '../../servess/pages/drink.service';
import { BillService } from '../../servess/pages/bill.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

declare var bootstrap: any; // Ensure Bootstrap types are available

@Component({
  imports: [ReactiveFormsModule],
  standalone: true,
  selector: 'app-mang-order',
  templateUrl: './mang-order.component.html',
  styleUrls: ['./mang-order.component.css'],
})
export class MangOrderComponent implements OnInit {
  @ViewChild('successToast', { static: false }) successToast!: ElementRef;

  drinksForm: FormGroup;
  empList!: EmpData[];
  drinklist!: drinkRes[];

  get drinks(): FormArray {
    return this.drinksForm.get('drinks') as FormArray;
  }

  constructor(
    private _BillService: BillService,
    private _EmployeService: EmployeService,
    private _DrinkService: DrinkService,
    private _FormBuilder: FormBuilder
  ) {
    this.drinksForm = this._FormBuilder.group({
      employeeName: new FormControl('', { updateOn: 'blur' }),
      drinks: this._FormBuilder.array([]),
      date: new FormControl('', { updateOn: 'blur' }),
    });
  }

  ngOnInit(): void {
    this.getEmps();
    this.getDrinks();
  }

  addDrinks() {
    let drinks = this._FormBuilder.group({
      drinkId: new FormControl('', { updateOn: 'blur' }),
      quantity: new FormControl('', { updateOn: 'blur' }),
    });
    this.drinks.push(drinks);
  }

  getEmps() {
    this._EmployeService.getAllEmp().subscribe({
      next: (res) => {
        this.empList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getDrinks() {
    this._DrinkService.getAlldrink().subscribe({
      next: (res) => {
        this.drinklist = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  TakeOrder() {
    if (this.drinksForm.valid) {
      this._BillService.TakeOrder(this.drinksForm.value).subscribe({
        next: (res) => {
          console.log(res);

          // Trigger success toast
          const toast = new bootstrap.Toast(this.successToast.nativeElement);
          toast.show();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Order completed!');
        },
      });
    }
  }

  removeDrinks(index: number) {
    this.drinks.removeAt(index);
  }
}
