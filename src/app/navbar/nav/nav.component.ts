import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SigninService } from '../../servess/athuntocation/signin.service';
import { LoginService } from '../../servess/athuntocation/login.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ RouterLink,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  inNav:boolean= false;

  constructor(public _SigninService:SigninService , public _LoginService:LoginService){}
  ngOnInit(): void {
    

this._LoginService.userdataInlogin.subscribe( ()=>{
  if( this._LoginService.userdataInlogin.getValue()!=null ){
    this.inNav=true;
  }
  else{
    this.inNav=false;
  }
} )

  }

}
