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
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/servess/pages/orders.service';
import { formatDate, JsonPipe } from '@angular/common';

declare var bootstrap: any; // Ensure Bootstrap types are available

@Component({
  imports: [ReactiveFormsModule, JsonPipe, FormsModule],
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
  isEditable: boolean = false;
  employeeName: any;
  orderId!: string;
  orderDetails: any;
  orders: any[] = [];
  get drinks(): FormArray {
    return this.drinksForm.get('drinks') as FormArray;
  }

  constructor(
    private _BillService: BillService,
    private _EmployeService: EmployeService,
    private ordersService: OrdersService,
    private _DrinkService: DrinkService,
    private _FormBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
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
    const data = this.activeRoute.snapshot.data['orderDetails'];
    if (data) {
      this.isEditable = true;
      this.orderDetails = data;
      this.populateForm(data);
    }
  }
  populateForm(order: any) {
    this.drinksForm.patchValue({
      employeeName: order.employee,
    });

    this.orders = order.orders.map((order: any) => {
      return {
        date: formatDate(order.date, 'dd/MM/yyyy', 'en-US'),
        _id: order._id,
        drinks: order.drinks || [],
      };
    });

    this.orders.forEach((order) => {
      order.drinks.forEach((drink: any) => {
        this.addDrinkToForm(order._id, drink);
      });
    });
  }

  addDrinkToForm(orderId: string, drink: any) {
    const drinkGroup = this._FormBuilder.group({
      orderId: new FormControl(orderId),
      drinkId: new FormControl({ value: drink.drinkId._id, disabled: true }),
      quantity: new FormControl(drink.quantity),
    });
    this.drinks.push(drinkGroup);
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

  updateOrder(index: number, orderId = '', drinkId = '') {
    const formGroup = this.drinks.at(index) as FormGroup;
    const formData = {
      orderId,
      drinkId,
      newQuantity: formGroup.controls['quantity'].value,
    };

    this.ordersService.updateDrink(formData).subscribe({
      next: (res) => {
        console.log(res);
        // Trigger success toast
        const toast = new bootstrap.Toast(this.successToast.nativeElement);
        toast.show();
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
