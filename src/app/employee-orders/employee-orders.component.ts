import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../servess/pages/orders.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-employee-orders',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './employee-orders.component.html',
  styleUrls: ['./employee-orders.component.css'],
})
export class EmployeeOrdersComponent implements OnInit {
  @ViewChild('successToast') successToast!: ElementRef;
  @ViewChild('errorToast') errorToast!: ElementRef;
  employeeName: string = '';
  orders: any[] = [];
  isLoading = true;
  isUpdating: boolean = false;
  isDeleting: boolean = false;

  selectedOrderId: string = '';
  selectedDrinkId: string = '';
  selectedNewQuantity: number = 0;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeName = params.get('employeeName')!;
      this.fetchOrders();
    });
  }

  fetchOrders(): void {
    this.isLoading = true;
    this.ordersService.getOrderByEmplyeeName(this.employeeName).subscribe(
      (data) => {
        this.orders = data.orders.map((order: any) => ({
          orderId: order._id,
          date: order.date,
          paid: order.paid,
          totalPrice: order.totalOrdersPrice,
          drinks: order.drinks.map((drink: any) => ({
            drinkId: drink.drinkId._id,
            drinkName: drink.drinkId.name,
            quantity: drink.quantity,
            newQuantity: drink.quantity, // Editable quantity field
          })),
        }));
        this.isLoading = false;
      },
      () => (this.isLoading = false)
    );
  }
  openUpdateModal(orderId: string, drinkId: string, newQuantity: number): void {
    this.selectedOrderId = orderId;
    this.selectedDrinkId = drinkId;
    this.selectedNewQuantity = newQuantity;
    const updateModal = new bootstrap.Modal(
      document.getElementById('updateModal')
    );
    updateModal.show();
  }
  updateQuantity(): void {
    if (this.selectedNewQuantity <= 0) return;
    this.isUpdating = true;
    this.ordersService
      .updateDrink({
        orderId: this.selectedOrderId,
        drinkId: this.selectedDrinkId,
        newQuantity: this.selectedNewQuantity,
      })
      .subscribe({
        next: () => {
          this.fetchOrders();
          this.isUpdating = false;
          const toast = new bootstrap.Toast(this.successToast.nativeElement);
          toast.show();
          const updateModal = bootstrap.Modal.getInstance(
            document.getElementById('updateModal')
          );
          updateModal.hide();
        },
        error: () => {
          this.isUpdating = false;
          const toast = new bootstrap.Toast(this.errorToast.nativeElement);
          toast.show();
        },
      });
  }

  openDeleteModal(orderId: string, drinkId: string): void {
    this.selectedOrderId = orderId;
    this.selectedDrinkId = drinkId;
    const deleteModal = new bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    deleteModal.show();
  }
  deleteDrink(): void {
    this.isDeleting = true;
    this.ordersService
      .deleteDrink({
        orderId: this.selectedOrderId,
        drinkId: this.selectedDrinkId,
      })
      .subscribe({
        next: () => {
          this.isDeleting = false;
          this.fetchOrders();
          const toast = new bootstrap.Toast(this.successToast.nativeElement);
          toast.show();
          const deleteModal = bootstrap.Modal.getInstance(
            document.getElementById('deleteModal')
          );
          deleteModal.hide();
        },
        error: () => {
          this.isDeleting = false;
          const toast = new bootstrap.Toast(this.errorToast.nativeElement);
          toast.show();
        },
      });
  }
}
