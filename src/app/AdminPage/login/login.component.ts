import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { SigninService } from '../../servess/athuntocation/signin.service';
import { Login } from '../../interfaces/athuntocation/login';
import { LoginService } from '../../servess/athuntocation/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  logininForm : FormGroup =new FormGroup({
   
    email : new FormControl(null, [Validators.required , Validators.email]),
    password : new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
   
  } )
 

   /////////////////// conect api   /////////////////////////
    constructor( private _LoginService:LoginService , private _Router: Router){}

   submitLogin(){
    if( this.logininForm.valid){
      
      this.spiner=true;

      this._LoginService.login(this.logininForm.value).subscribe({

        next:res=>{
          localStorage.setItem('usertokenlogin',res.token)
          this._LoginService.decoUserdata();
          this._Router.navigate(['/order'])
         // console.log(res)
          this.spiner=false;
        },
        error:err=>{
         // console.log(err);
          this.spiner=false;
          this.errmsg=err.error.stack;
          
          


          
        }
      })
    }
    
  }
  //////////////////// condtions  ////////////////////////
     
    spiner:boolean=false;
    errmsg !:string;

}
