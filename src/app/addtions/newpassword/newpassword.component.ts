import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetService } from '../../servess/athuntocation/forget.service';
import { LoginService } from '../../servess/athuntocation/login.service';

@Component({
  selector: 'app-newpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './newpassword.component.html',
  styleUrl: './newpassword.component.css'
})
export class NewpasswordComponent {

  newPassForm : FormGroup =new FormGroup({
   
    email: new FormControl(null, [Validators.required , Validators.email]),
    newPassword: new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
   
  } )
 

   /////////////////// conect api   /////////////////////////
    constructor( private _ForgetServic:ForgetService, private _LoginService:LoginService , private _Router: Router){}

   submitNewPass(){
    if( this.newPassForm.valid){
      
      this.spiner=true;

      this._ForgetServic.newpass(this.newPassForm.value).subscribe({

        next:res=>{
          
          this._Router.navigate(['/login'])
          //console.log(res.token)
          this.spiner=false;
        },
        error:err=>{
          console.log(err);
          this.spiner=false;
         
          
          


          
        }
      })
    }
    
  }
  //////////////////// condtions  ////////////////////////
     
    spiner:boolean=false;
    errmsg !:string;


}
