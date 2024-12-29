import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../../servess/pages/employe.service';
import { EmpData } from '../../interfaces/pages/emp';
import { BillService } from '../../servess/pages/bill.service';
import { Order, respon } from '../../interfaces/pages/bill';

@Component({
  selector: 'app-mangebills',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './mangebills.component.html',
  styleUrl: './mangebills.component.css',
})
export class MangebillsComponent implements OnInit {
  ngOnInit(): void {
    if (typeof localStorage != 'undefined')
      localStorage.setItem('last Page', '/bills');

    ///////////////call//////////////
    // this.getEmps();
  }

  constructor(
    private _EmployeService: EmployeService,
    private _BillService: BillService
  ) {}

  BillForm: FormGroup = new FormGroup({
    employeeName: new FormControl(null, [Validators.required]),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });

  getEmps() {
    // this.dataCome=true;
    this._EmployeService.getAllEmp().subscribe({
      next: (res) => {
        // this.dataCome=false;
        this.empList = res.data;
        // console.log(this.empList);
      },
      error: (err) => {
        console.log(err);
        // this.dataCome=false;
      },
    });
  }
  empList!: EmpData[];
  spiner: boolean = false;
  come: boolean = false;

  ///////////////////////////////////////
  showone!: respon;
  showtwo!: Order[];

  counter: number = 0;

  getBill() {
    if (this.BillForm.valid) {
      this.spiner = true;
      this._BillService.getBill(this.BillForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.spiner = false;
          this.come = true;
          this.showone = res;
          this.showtwo = res.orders;
        },
        error: (err) => {
          console.log(err);
          this.spiner = false;
        },
      });
    }
  }
}
