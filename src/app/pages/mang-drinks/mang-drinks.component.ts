import { Component, OnInit } from '@angular/core';
import { DrinkService } from '../../servess/pages/drink.service';
import { drinkRes } from '../../interfaces/drinks';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mang-drinks',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './mang-drinks.component.html',
  styleUrl: './mang-drinks.component.css',
})
export class MangDrinksComponent implements OnInit {
  ngOnInit(): void {
    if (typeof localStorage != 'undefined')
      localStorage.setItem('last Page', '/drink');

    /////////////////// call ////////////////
    this.getDrinks();
  }
  ////////////////////////////constr...////////////
  constructor(private _DrinkService: DrinkService) {}
  /////////////////////////////////////////////////

  getDrinks() {
    this.dataCome = true;
    this._DrinkService.getAlldrink().subscribe({
      next: (res) => {
        this.dataCome = false;
        // console.log(res.data);
        this.drinklist = res.data;
      },
      error: (err) => {
        this.dataCome = false;
        console.log(err);
      },
    });
  }

  /////////////////////////////////////////////////////////////////////////////
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
  ///////////////////////////////////////////////////////////
  drinklist!: drinkRes[];
  dataCome: boolean = false;
}
