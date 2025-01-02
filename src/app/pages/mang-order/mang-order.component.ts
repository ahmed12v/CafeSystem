import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../../servess/pages/employe.service';
import { EmpData } from '../../interfaces/pages/emp';
import { drinkRes } from '../../interfaces/drinks';
import { DrinkService } from '../../servess/pages/drink.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BillService } from '../../servess/pages/bill.service';

@Component({
  selector: 'app-mang-order',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './mang-order.component.html',
  styleUrl: './mang-order.component.css',
})
export class MangOrderComponent implements OnInit {
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
    if (typeof localStorage != 'undefined')
      localStorage.setItem('last Page', '/order');

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
    // this.dataCome=true;
    this._EmployeService.getAllEmp().subscribe({
      next: (res) => {
        // this.dataCome=false;
        this.empList = res.data;
        // console.log(this.empList);
      },
      error: (err) => {
        console.log(err);
        // this.dataCome=false;
      },
    });
  }
  getDrinks() {
    //this.dataCome=true;
    this._DrinkService.getAlldrink().subscribe({
      next: (res) => {
        //   this.dataCome=false;
        // console.log(res.data);
        this.drinklist = res.data;
      },
      error: (err) => {
        // this.dataCome=false;
        console.log(err);
      },
    });
  }
  ///////////////////
  ///////////////////////

  TakeOrder() {
    if (this.drinksForm.valid) {
      this._BillService.TakeOrder(this.drinksForm.value).subscribe({
        next: (res) => {
          //   this.dataCome=false;
          console.log(res);
          // this.drinklist=res.data;
        },
        error: (err) => {
          // this.dataCome=false;
          console.log(err);
        },
        complete: () => {
          console.log('compliteeeee');
        },
      });
    }
  }

  removeDrinks(index: number) {
    this.drinks.removeAt(index);
  }
}
