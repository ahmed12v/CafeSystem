import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../servess/addtions/user-data.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-user-password.component.html',
  styleUrl: './update-user-password.component.css'
})
export class UpdateUserPasswordComponent {

  UpdateUserPass : FormGroup =new FormGroup({
   
    currentPassword : new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)] ),
    password : new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,}$/) ] ),
    passwordConfirm : new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)] ),
   
  },this.checkpasswordConfirm);

  ///////////////////////////////////////////
  checkpasswordConfirm(match:AbstractControl){

    if(match.get('password')?.value === match.get('passwordConfirm')?.value ){
         return null ;}

         else{

          match.get('passwordConfirm')?.setErrors({missmatch:true});
          return {missmatch:true};

           
         }
    
  } 
  ////////////////////////////////////////////////////

  constructor( private _UserDataService:UserDataService , private _Router:Router){}

  submitUp()
  {
    if( this.UpdateUserPass.valid){
      
      this.spiner=true;

      this._UserDataService.UpdatUserData(this.UpdateUserPass.value).subscribe({

        next:res=>{

        // console.log(res)
          this.spiner=false;
          this._Router.navigate(['/getme'])
        },
        error:err=>{
       console.log(err);
          this.spiner=false;
         
          
        }
      })
    }
    
  }
  //////////////////////
  spiner:boolean=false;


}
