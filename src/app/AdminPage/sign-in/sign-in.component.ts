import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SigninService } from '../../servess/athuntocation/signin.service';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  signinForm : FormGroup =new FormGroup({
    name : new FormControl( null , [Validators.required , Validators.minLength(3)]),
    email : new FormControl(null, [Validators.required , Validators.email]),
    password : new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
    passwordConfirm : new FormControl(null, Validators.required)
  } , this.checkpasswordConfirm)
 
  ///////////////////////////////////////////
  checkpasswordConfirm(match:AbstractControl){

    if(match.get('password')?.value === match.get('passwordConfirm')?.value ){
         return null ;}

         else{

          match.get('passwordConfirm')?.setErrors({missmatch:true});
          return {missmatch:true};

           
         }
    
  } 

   /////////////////// conect api   /////////////////////////
    constructor( private _SigninService:SigninService , private _Router: Router){}

   submitSign(){
    if( this.signinForm.valid){
      
      this.spiner=true;

      this._SigninService.signin(this.signinForm.value).subscribe({

        next:res=>{
          console.log(res)
          this._Router.navigate(['/login'])
          this.spiner=false;
        },
        error:err=>{
          console.log(err);
          this.spiner=false;
          this.errmsg=err.error.errors[0].msg
          
          console.log(this.errmsg);
          



          
        }
      })
    }
    
  }
  //////////////////// condtions  ////////////////////////
     
    spiner:boolean=false;
    errmsg !:string;
}
