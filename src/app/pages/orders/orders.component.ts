import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from 'src/app/servess/pages/orders.service';
// import { RouterLink, RouterLinkActive } from '@angular/router';

declare var bootstrap: any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  standalone: true,
  styleUrls: ['./orders.component.css'],
  imports: [RouterLink, FormsModule],
})
export class OrdersComponent implements OnInit {
  @ViewChild('successToast', { static: false }) successToast!: ElementRef;
  @ViewChild('confirmPaymentModal', { static: true })
  confirmPaymentModal!: ElementRef;
  selectedOrder: any = null;
  orders: any[] = [];
  finalTotal: number = 0;
  isLoading = true;
  isPaying: any = false;
  isConfirming: any = false;
  filteredOrders: any[] = []; // New filtered array
  searchText: string = ''; // Input text for search
  constructor(
    private ordersService: OrdersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.isLoading = true;
    this.ordersService.getOrders().subscribe({
      next: (res) => {
        this.orders = res.data.employees.map((order: any) => ({
          ...order,
          isPaying: false,
          paid: false,
        }));
        this.filteredOrders = this.orders;
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

  search(): void {
    const searchTerm = this.searchText.toLowerCase();
    this.filteredOrders = this.orders.filter((order) =>
      order.employeeName.toLowerCase().includes(searchTerm)
    );
  }
  // Clear search input and reset orders
  clearSearch(): void {
    this.searchText = '';
    this.filteredOrders = [...this.orders];
  }
  openConfirmModal(order: any): void {
    this.selectedOrder = order;
    const modal = new bootstrap.Modal(
      document.getElementById('confirmPaymentModal')!
    );
    modal.show();
  }

  confirmPayment(): void {
    if (!this.selectedOrder) return;

    this.isConfirming = true;
    const order = this.selectedOrder;
    order.isPaying = true;

    this.ordersService.markAsPaid(order.employeeName).subscribe({
      next: () => {
        this.toastr.success('Bill marked as paid successfully!');
        order.isPaying = false;
        order.paid = true;
        this.isConfirming = false;

        const modalElement = document.getElementById('confirmPaymentModal');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) {
            modalInstance.hide();
          }
        }
      },
      error: () => {
        order.isPaying = false;
        this.isConfirming = false;
        this.toastr.error('Failed to mark bill as paid');
      },
    });
  }
}
