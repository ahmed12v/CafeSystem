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
  constructor(private _DrinkService: DrinkService, private _Router: Router) {}

  adddrinkForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
  });

  submitadd() {
    if (this.adddrinkForm.valid) {
      this.spiner = true;

      this._DrinkService.Adddrink(this.adddrinkForm.value).subscribe({
        next: (res) => {
          this.spiner = false;
          this._Router.navigate(['/drink']);
        },
        error: (err) => {
          console.log(err);
          this.spiner = false;
          // this.errmsg=err.message;
        },
      });
    }
  }
  //////////////////// condtions  ////////////////////////

  spiner: boolean = false;
  errmsg!: string;
}
