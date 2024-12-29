import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../servess/athuntocation/login.service';
import { ForgetService } from '../../servess/athuntocation/forget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpass',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.css'
})
export class ForgetpassComponent {
  forgetForm : FormGroup =new FormGroup({
   
    email : new FormControl(null, [Validators.required , Validators.email]),
   
   
  } )
 

   /////////////////// conect api   /////////////////////////
    constructor( private _ForgetService:ForgetService , private _Router: Router){}

   sendemail(){
    if( this.forgetForm.valid){
      
      this.spiner=true;

      this._ForgetService.forgetpassword(this.forgetForm.value).subscribe({

        next:res=>{
          this. _Router.navigate(['/verviycode'])
          console.log(res)
          this.spiner=false;
        },
        error:err=>{
          console.log(err);
          this.errMasge=err.error.stack;
          console.log(this.errMasge);
          
          this.spiner=false;

          
        }
      })
    }
    
  }
  //////////////////// condtions  ////////////////////////
     
    spiner:boolean=false;
    errMasge!:string;


}
