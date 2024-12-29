import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ForgetService } from '../../servess/athuntocation/forget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vrifycode',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './vrifycode.component.html',
  styleUrl: './vrifycode.component.css'
})
export class VrifycodeComponent {
     
  codeForm : FormGroup =new FormGroup({
   
    resetCode : new FormControl(null, [Validators.required ]),
   
   
  } )
 

   /////////////////// conect api   /////////////////////////
    constructor( private _ForgetService:ForgetService , private _Router: Router){}

   sendcode(){
    if( this.codeForm.valid){
      
      this.spiner=true;

      this._ForgetService.SendCode(this.codeForm.value).subscribe({

        next:res=>{
          this. _Router.navigate(['/newpass'])
          console.log(res)
          this.spiner=false;
        },
        error:err=>{
          console.log(err);
          this.errMasgeCode=err.error.stack;
          console.log(this.errMasgeCode);
          
          this.spiner=false;

          
        }
      })
    }
    
  }
  //////////////////// condtions  ////////////////////////
     
    spiner:boolean=false;
    errMasgeCode!:string;

}
