import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmployeService } from '../../servess/pages/employe.service';
import { EmpData } from '../../interfaces/pages/emp';
import { drinkRes } from '../../interfaces/drinks';
import { DrinkService } from '../../servess/pages/drink.service';
import { BillService } from 'src/app/interfaces/athuntocation/signin';
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
  spiner: boolean = false;

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
      const formData = {
        ...this.drinksForm.value,
        date: this.formatDateToDDMMYYYY(this.drinksForm.value.date),
      };
      this.spiner = true;
      this._BillService.TakeOrder(formData).subscribe({
        next: (res) => {
          console.log(res);
          this.spiner = false;

          // Trigger success toast
          const toast = new bootstrap.Toast(this.successToast.nativeElement);
          toast.show();

          this.drinksForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.spiner = false;

          this.drinksForm.reset();
        },
      });
    }
  }

  removeDrinks(index: number) {
    this.drinks.removeAt(index);
  }

  formatDateToDDMMYYYY(date: string): string {
    const dateParts = date.split('-');
    if (dateParts.length === 3) {
      return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    }
    return date; // Return the same date if formatting fails
  }
}
