import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DrinkService } from '../../servess/pages/drink.service';

@Component({
  selector: 'app-updat-drink',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './updat-drink.component.html',
  styleUrl: './updat-drink.component.css'
})
export class UpdatDrinkComponent {

  constructor(private _DrinkService:DrinkService , private _Router:Router,private _ActivatedRoute:ActivatedRoute){}

  updatdrinkForm: FormGroup =new FormGroup({
   
    price: new FormControl(null, Validators.required ),
   
  } )


  
  submitupdate(){

    let id :string='';
    this._ActivatedRoute.params.subscribe({
      next:res=>{
       // console.log(res['id']);
        id=res['id'];
        
      }
    })

    if( this.updatdrinkForm.valid){
      
      this.spiner=true;

      this._DrinkService.updatdrink(this.updatdrinkForm.value,id).subscribe({

        next:res=>{

       //  console.log(res)
          this.spiner=false;
          this._Router.navigate(['/drink'])
        },
        error:err=>{
       console.log(err);
          this.spiner=false;
        // this.errmsg=err.message;
          
          


          
        }
      })
    }
    
  }
  //////////////////// condtions  ////////////////////////
     
    spiner:boolean=false;
    errmsg !:string;

}
