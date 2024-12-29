import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeService } from '../../servess/pages/employe.service';

@Component({
  selector: 'app-addemp',
  standalone: true,
  imports: [RouterLink , ReactiveFormsModule],
  templateUrl: './addemp.component.html',
  styleUrl: './addemp.component.css'
})
export class AddempComponent {

  constructor(private _EmployeService:EmployeService , private _Router:Router){}

  addempForm : FormGroup =new FormGroup({
   
    name : new FormControl(null, Validators.required ),
    role : new FormControl(null, Validators.required ),
   
  } )

  submitadd(){
    if( this.addempForm.valid){
      
      this.spiner=true;

      this._EmployeService.AddEmp(this.addempForm.value).subscribe({

        next:res=>{

        // console.log(res)
          this.spiner=false;
          this._Router.navigate(['/employee'])
        },
        error:err=>{
       console.log(err);
          this.spiner=false;
         this.errmsg=err.message;
          
          


          
        }
      })
    }
    
  }
  //////////////////// condtions  ////////////////////////
     
    spiner:boolean=false;
    errmsg !:string;

}
