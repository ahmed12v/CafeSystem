import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDataService } from '../../servess/addtions/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-userdata',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './update-userdata.component.html',
  styleUrl: './update-userdata.component.css'
})
export class UpdateUserdataComponent {

  UpdateUserData : FormGroup =new FormGroup({
   
    name : new FormControl(null, Validators.required ),
    email : new FormControl(null, [Validators.required , Validators.email] ),
   
  } );

  constructor( private _UserDataService:UserDataService , private _Router:Router){}

  submitUp()
  {
    if( this.UpdateUserData.valid){
      
      this.spiner=true;

      this._UserDataService.UpdatUserData(this.UpdateUserData.value).subscribe({

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
