import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { EmployeService } from '../../servess/pages/employe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatemp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './updatemp.component.html',
  styleUrl: './updatemp.component.css'
})
export class UpdatempComponent {
  constructor(private _EmployeService:EmployeService , private _Router:Router , private _ActivatedRoute:ActivatedRoute){}

  UpdatempForm : FormGroup =new FormGroup({
   
    name : new FormControl(null, Validators.required ),
    role : new FormControl(null, Validators.required ),
   
  } )

  submitUpdat(){
    let id :string='';
    this._ActivatedRoute.params.subscribe({
      next:res=>{
       // console.log(res['id']);
        id=res['id'];
        
      }
    })

    if( this.UpdatempForm.valid){
      
      this.spiner=true;

      this._EmployeService.updatEmp(this.UpdatempForm.value,id).subscribe({

        next:res=>{

       //  console.log(res)
          this.spiner=false;
          this._Router.navigate(['/employee'])
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
