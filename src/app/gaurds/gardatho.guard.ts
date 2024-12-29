import { LoginService } from './../servess/athuntocation/login.service';
import { CanActivateFn, Router } from '@angular/router';
import { Inject } from '@angular/core';

export const gardathoGuard: CanActivateFn = (route, state) => {

  let _LoginService:LoginService=Inject(LoginService);
 // let _Router:Router=Inject(Router);
  if(_LoginService.userdataInlogin.getValue() !=null){
    return true ;
   // _Router.navigate(['/home'])
  }
  
 

 
  return false;
};
