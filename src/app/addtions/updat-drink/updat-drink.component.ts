import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DrinkService } from '../../servess/pages/drink.service';

@Component({
  selector: 'app-updat-drink',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './updat-drink.component.html',
  styleUrl: './updat-drink.component.css',
})
export class UpdatDrinkComponent {
  spiner: boolean = false;
  errmsg!: string;
  constructor(
    private _DrinkService: DrinkService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  updatdrinkForm: FormGroup = new FormGroup({
    price: new FormControl(null),
    unionPrice: new FormControl(null),
    dentistryPrice: new FormControl(null),
  });

  submitupdate() {
    let id: string = '';
    this._ActivatedRoute.params.subscribe({
      next: (res) => {
        id = res['id'];
      },
    });

    if (this.updatdrinkForm.valid) {
      this.spiner = true;

      // Prepare the request body by filtering out undefined or null fields
      const updatedDrink: any = {};
      if (
        this.updatdrinkForm.get('price')?.value !== null &&
        this.updatdrinkForm.get('price')?.value !== undefined
      ) {
        updatedDrink.price = this.updatdrinkForm.get('price')?.value;
      }
      if (
        this.updatdrinkForm.get('unionPrice')?.value !== null &&
        this.updatdrinkForm.get('unionPrice')?.value !== undefined
      ) {
        updatedDrink.unionPrice = this.updatdrinkForm.get('unionPrice')?.value;
      }
      if (
        this.updatdrinkForm.get('dentistryPrice')?.value !== null &&
        this.updatdrinkForm.get('dentistryPrice')?.value !== undefined
      ) {
        updatedDrink.dentistryPrice =
          this.updatdrinkForm.get('dentistryPrice')?.value;
      }

      // Send the request to update the drink
      this._DrinkService.updatdrink(updatedDrink, id).subscribe({
        next: (res) => {
          this.spiner = false;
          this._Router.navigate(['/drink']);
        },
        error: (err) => {
          console.log(err);
          this.spiner = false;
        },
      });
    }
  }
}
