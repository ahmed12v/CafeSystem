import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../servess/addtions/user-data.service';
import { Data, userdata } from '../../interfaces/userdata';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-userdata',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './userdata.component.html',
  styleUrl: './userdata.component.css'
})
export class UserdataComponent implements OnInit {
  
  ngOnInit(): void {
    if(typeof localStorage != 'undefined')
      localStorage.setItem('last Page' , '/getme')

    /////////////////// call ////////////////
    this.getUserdata();
   
  }
  constructor( private _UserDataService:UserDataService){}

  getUserdata()
  {
    this.dataCome=true;
     this._UserDataService.getUserData().subscribe({
      next:res=>{
        //console.log(res);
        this.userData=res.data;
        this.dataCome=false
      },
      error:err=>{
        console.log(err);
        this.dataCome=false

        
      }
     })
  }
  ///////////////////////////
  userData!:Data;
  dataCome:boolean=false; 
}
