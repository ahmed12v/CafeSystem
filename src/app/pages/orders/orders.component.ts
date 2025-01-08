import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  isLoading = true;

  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.ordersService.getOrders().subscribe({
      next: (res) => {
        this.orders = res.data; // Assuming `data` contains the orders array
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to load orders');
        this.isLoading = false;
      },
    });
  }

  payBill(employeeName: string): void {
    this.ordersService.markAsPaid(employeeName).subscribe({
      next: () => {
        this.toastr.success('Bill marked as paid successfully!');
        // Update the UI
        const order = this.orders.find((o) => o.employeeName === employeeName);
        if (order) {
          order.paid = true;
        }
        const toast = new bootstrap.Toast(this.successToast.nativeElement);
        toast.show();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to mark bill as paid');
      },
    });
  }
}
