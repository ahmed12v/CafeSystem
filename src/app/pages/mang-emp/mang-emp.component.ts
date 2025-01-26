import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Emp, EmpData } from '../../interfaces/pages/emp';
import { EmployeService } from '../../servess/pages/employe.service';
import { RouterLink } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-mang-emp',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mang-emp.component.html',
  // styleUrl: './mang-emp.component.css'
})
export class MangEmpComponent implements OnInit {
  @ViewChild('successToast', { static: false }) successToast!: ElementRef; // Toast element reference
  @ViewChild('errorToast', { static: false }) errorToast!: ElementRef; // Error toast reference

  empList!: EmpData[];
  dataCome: boolean = false;
  empToDelete: string | null = null; // Track which employee to delete
  modalInstance: any;
  spinner: boolean = false;

  ////////////////////////////constractour///////////////////////
  constructor(private _EmployeService: EmployeService) {}
  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('last Page', '/employee');
      ////////////////////////////call//////////////////////////
      this.getEmps();
    } else {
      console.warn('localStorage is not available in this environment.');
    }
  }
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
  confirmDelete(empId: string) {
    this.empToDelete = empId;
    const modalElement = document.getElementById('confirmDeleteModal');
    this.modalInstance = new bootstrap.Modal(modalElement);
    this.modalInstance.show();
  }
  deleteEmp() {
    this.spinner = true;
    if (this.empToDelete) {
      this._EmployeService.deletupdatEmp(this.empToDelete).subscribe({
        next: () => {
          this.modalInstance.hide();
          this.getEmps();
          // Show success toast
          const toast = new bootstrap.Toast(this.successToast.nativeElement);
          toast.show();
          this.spinner = false;
        },
        error: () => {
          this.modalInstance.hide();
          // Show error toast
          const toast = new bootstrap.Toast(this.errorToast.nativeElement);
          toast.show();
          this.spinner = false;
        },
      });
    }
  }
}
