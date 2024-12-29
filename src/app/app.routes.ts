import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MangEmpComponent } from './pages/mang-emp/mang-emp.component';
import { MangOrderComponent } from './pages/mang-order/mang-order.component';
import { MangebillsComponent } from './pages/mangebills/mangebills.component';
import { MangDrinksComponent } from './pages/mang-drinks/mang-drinks.component';
import { LoginComponent } from './AdminPage/login/login.component';
import { SignInComponent } from './AdminPage/sign-in/sign-in.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ForgetpassComponent } from './addtions/forgetpass/forgetpass.component';
import { gardathoGuard } from './gaurds/gardatho.guard';
import { VrifycodeComponent } from './addtions/vrifycode/vrifycode.component';
import { NewpasswordComponent } from './addtions/newpassword/newpassword.component';
import { AddempComponent } from './addtions/addemp/addemp.component';
import { UpdatempComponent } from './addtions/updatemp/updatemp.component';
import { AddDrinkComponent } from './addtions/add-drink/add-drink.component';
import { UpdatDrinkComponent } from './addtions/updat-drink/updat-drink.component';
import { UserdataComponent } from './addtions/userdata/userdata.component';
import { UpdateUserdataComponent } from './addtions/update-userdata/update-userdata.component';
import { UpdateUserPasswordComponent } from './addtions/update-user-password/update-user-password.component';

export const routes: Routes = [
    {path:'', redirectTo:'home',pathMatch:'full'},
    {path:'home', component:HomeComponent },
    //////////////////////////////////////////
    {path:'employee', component:MangEmpComponent ,  },
    {path:'addemp', component:AddempComponent ,  },
    {path:'updatemp/:id', component:UpdatempComponent ,  },
    //////////////////////////////////////////////
    {path:'order', component:MangOrderComponent ,  },
    ///////////////////////////////////////////
    {path:'bills', component:MangebillsComponent ,  },
    ///////////////////////////////////////////
    {path:'drink', component:MangDrinksComponent ,  },
    {path:'adddrink', component:AddDrinkComponent ,  },
    {path:'updatdrink/:id', component:UpdatDrinkComponent ,  },
    ////////////////////////////////////////////
    {path:'login', component:LoginComponent },
    {path:'forgetpassword', component:ForgetpassComponent },
    {path:'verviycode', component:VrifycodeComponent },
    {path:'newpass', component:NewpasswordComponent },
    {path:'getme', component:UserdataComponent },
    {path:'Udata', component:UpdateUserdataComponent },
    {path:'Upass', component:UpdateUserPasswordComponent },
    /////////////////////////////////////////////
    {path:'signin', component:SignInComponent },
    {path:'**', component:NotFoundComponent },
];
