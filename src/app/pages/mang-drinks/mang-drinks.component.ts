import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrinkService } from '../../servess/pages/drink.service';
import { drinkRes } from '../../interfaces/drinks';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-mang-drinks',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './mang-drinks.component.html',
  styleUrl: './mang-drinks.component.css',
})
export class MangDrinksComponent implements OnInit {
  @ViewChild('successToast', { static: false }) successToast!: ElementRef;
  @ViewChild('errorToast', { static: false }) errorToast!: ElementRef;

  drinklist!: drinkRes[];
  dataCome: boolean = false;
  selectedPriceType!: string;

  constructor(private _DrinkService: DrinkService) {}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('last Page', '/drink');

      this.getDrinks();
    } else {
      console.warn('localStorage is not available in this environment.');
    }
  }

  getDrinks() {
    this.dataCome = true;
    this._DrinkService.getAlldrink().subscribe({
      next: (res) => {
        this.dataCome = false;
        this.drinklist = res.data;
      },
      error: (err) => {
        this.dataCome = false;
        console.log(err);
      },
    });
  }

  deletDrink(drnkid: string) {
    this._DrinkService.deletupdatEmp(drnkid).subscribe({
      next: () => {
        this.showToast(this.successToast); // Show success toast
        this.getDrinks();
      },
      error: (er) => {
        if (er.status === 400) {
          this.errorToast.nativeElement.querySelector('.toast-body').innerText =
            'This drink is associated with existing orders and cannot be deleted.';
        } else {
          this.errorToast.nativeElement.querySelector('.toast-body').innerText =
            'An error occurred while deleting the drink. Please try again.';
        }
        this.showToast(this.errorToast); // Show error toast
        console.error(er);
      },
    });
  }

  private showToast(toastElement: ElementRef) {
    const toast = new bootstrap.Toast(toastElement.nativeElement);
    toast.show();
  }
  showRegularPrice() {
    this.selectedPriceType = 'regular';
  }

  showUnionPrice() {
    this.selectedPriceType = 'union';
  }

  showDentistryPrice() {
    this.selectedPriceType = 'dentistry';
  }

  getPrice(item: drinkRes): number {
    switch (this.selectedPriceType) {
      case 'union':
        return item.unionPrice;
      case 'dentistry':
        return item.dentistryPrice;
      default:
        return item.price;
    }
  }
}
