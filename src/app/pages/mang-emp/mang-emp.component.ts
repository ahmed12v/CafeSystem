import { Component, OnInit } from '@angular/core';
import { Emp, EmpData } from '../../interfaces/pages/emp';
import { EmployeService } from '../../servess/pages/employe.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mang-emp',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mang-emp.component.html',
  // styleUrl: './mang-emp.component.css'
})
export class MangEmpComponent implements OnInit {
  ngOnInit(): void {
    if (typeof localStorage != 'undefined')
      localStorage.setItem('last Page', '/employee');
    ////////////////////////////call//////////////////////////
    this.getEmps();
  }
  ////////////////////////////constractour///////////////////////
  constructor(private _EmployeService: EmployeService) {}
  ////////////////////// get emp////////////////////////////////
  getEmps() {
    this.dataCome = true;
    this._EmployeService.getAllEmp().subscribe({
      next: (res) => {
        this.dataCome = false;
        this.empList = res.data;
        // console.log(this.empList);
      },
      error: (err) => {
        console.log(err);
        this.dataCome = false;
      },
    });
  }
  //////////////////////////////////////////////////////////////////////////////////
  empList!: EmpData[];
  dataCome: boolean = false;
  //////////////////////////////////////////////////////////////////////////////////

  deletemp(empid: string) {
    this._EmployeService.deletupdatEmp(empid).subscribe({
      next: (res) => {
        this.getEmps();
        //    console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
