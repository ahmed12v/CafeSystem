import { Component, OnInit } from '@angular/core';
import { DrinkService } from '../../servess/pages/drink.service';
import { drinkRes } from '../../interfaces/drinks';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-mang-drinks',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './mang-drinks.component.html',
  styleUrl: './mang-drinks.component.css',
})
export class MangDrinksComponent implements OnInit {
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
      next: (res) => {
        this.getDrinks();
      },
      error: (er) => {
        console.log(er);
      },
    });
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
