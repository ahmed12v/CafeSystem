import { Component } from '@angular/core';
import { DrinkService } from '../../servess/pages/drink.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-drink',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-drink.component.html',
  styleUrl: './add-drink.component.css',
})
export class AddDrinkComponent {
  spiner: boolean = false;
  errmsg!: string;

  constructor(private _DrinkService: DrinkService, private _Router: Router) {}

  adddrinkForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    unionPrice: new FormControl(null, Validators.min(0)),
    dentistryPrice: new FormControl(null, Validators.min(0)),
  });

  submitadd() {
    if (this.adddrinkForm.valid) {
      this.spiner = true;

      const newDrink = {
        name: this.adddrinkForm.get('name')?.value,
        price: this.adddrinkForm.get('price')?.value,
        unionPrice: this.adddrinkForm.get('unionPrice')?.value || null,
        dentistryPrice: this.adddrinkForm.get('dentistryPrice')?.value || null,
      };

      this._DrinkService.Adddrink(newDrink).subscribe({
        next: (res) => {
          this.spiner = false;
          this._Router.navigate(['/drink']);
        },
        error: (err) => {
          console.log(err);
          this.spiner = false;
          this.errmsg =
            err.error.message || 'An error occurred while adding the drink.';
        },
      });
    }
  }
}
