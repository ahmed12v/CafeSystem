import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../../servess/pages/employe.service';
import { EmpData } from '../../interfaces/pages/emp';
import { drinkRes } from '../../interfaces/drinks';
import { DrinkService } from '../../servess/pages/drink.service';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BillService } from '../../servess/pages/bill.service';

@Component({
  selector: 'app-mang-order',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './mang-order.component.html',
  styleUrl: './mang-order.component.css'
})
export class MangOrderComponent implements OnInit {
  ngOnInit(): void {
    if(typeof localStorage != 'undefined')
      localStorage.setItem('last Page' , '/order')

    this.getEmps();
    this.getDrinks();
  }
  ////////////////////////////////////////////////
  
drinksForm :FormGroup ;
/////////////////////////////////////////////////////////////////////////


  constructor(private _BillService:BillService, private _EmployeService:EmployeService , private _DrinkService:DrinkService , private _FormBuilder:FormBuilder){

    this.drinksForm = this._FormBuilder.group({
      employeeName : new FormControl('', { updateOn: 'blur' }),
      drinks: this._FormBuilder.array([]),
      date: new FormControl('', { updateOn: 'blur' })
    });
  }


  //////////////////drinkId": "6702ac11fe28bfe5a6bbe1b5",
         //   "quantity": 2
         // }////////////////

  drinks():FormArray{
    return this.drinksForm.get("drinks")as FormArray ;
  }

  addDrinks(){
    let drinks = this._FormBuilder.group({
      drinkId : new FormControl('', { updateOn: 'blur' }),
      quantity : new FormControl('', { updateOn: 'blur' })
    })

    this.drinks().push(this.drinksForm);
  }

  /////////////////////////////////

  getEmps()
 {
 // this.dataCome=true;
    this._EmployeService.getAllEmp().subscribe({
      next:res=>{
       // this.dataCome=false;
        this.empList=res.data;
      // console.log(this.empList);
       
      },
      error:err=>{
        console.log(err);
       // this.dataCome=false;

        
      }
    })
 }
 //////////////////////////////////////////////////////////////////////////////////
 empList!:EmpData[];
 /////////////////////////////////////////////////////////////

 getDrinks()
 {
   //this.dataCome=true;
    this._DrinkService.getAlldrink().subscribe({
     next:res=>{
    //   this.dataCome=false;
      // console.log(res.data);
       this.drinklist=res.data;
     },
     error:err=>{
      // this.dataCome=false;
       console.log(err);
       
     }
    })
 }
 ///////////////////
 drinklist!:drinkRes[];
 ///////////////////////

 TakeOrder()
 {
  if(this.drinksForm.valid){

    this._BillService.TakeOrder(this.drinksForm.value).subscribe({

      next:res=>{
        //   this.dataCome=false;
          console.log(res);
          // this.drinklist=res.data;
         },
         error:err=>{
          // this.dataCome=false;
           console.log(err);
           
         },
         complete :() =>{
         console.log("compliteeeee")

         }
        })

  }
 
    
 }

 removeDrinks(index:number){
  this.drinks().removeAt(index)
 }
}
