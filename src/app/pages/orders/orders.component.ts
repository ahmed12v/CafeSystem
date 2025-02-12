import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/servess/pages/orders.service';
// import { RouterLink, RouterLinkActive } from '@angular/router';

declare var bootstrap: any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  @ViewChild('successToast', { static: false }) successToast!: ElementRef;
  orders: any[] = [];
  finalTotal: number = 0;
  isLoading = true;
  isPaying: any = false;
  employeeName: any;
  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.activeRoute.paramMap.subscribe((params) => {
      this.employeeName = params.get('id') || '';
      if (this.employeeName) {
        this.getOrders();
      }
    });
  }

  getOrders() {
    this.ordersService
      .getOrderByEmplyeeName(this.employeeName)
      .subscribe((res: any) => {
        console.log(res)
        this.orders = res.orders;
      });
  }

  fetchOrders(): void {
    this.ordersService.getOrders().subscribe({
      next: (res) => {
        this.orders = res.data.employees.map((order: any) => ({
          ...order,
          isPaying: false,
          paid: false,
        }));
        this.finalTotal = res.data.finalTotal;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to load orders');
        this.isLoading = false;
      },
    });
  }

  payBill(order: any): void {
    order.isPaying = true;
    this.ordersService.markAsPaid(order.employeeName).subscribe({
      next: () => {
        this.toastr.success('Bill marked as paid successfully!');
        order.isPaying = false;
        // Update the UI
        const order1 = this.orders.find(
          (o) => o.employeeName === order.employeeName
        );
        if (order1) {
          order.paid = true;
        }
        const toast = new bootstrap.Toast(this.successToast.nativeElement);
        toast.show();
      },
      error: (err) => {
        order.isPaying = false;
        this.toastr.error('Failed to mark bill as paid');
      },
    });
  }

  getEmpl(employeeName: string) {
    this.router.navigate(['/employee-orders', employeeName]);
  }
}
