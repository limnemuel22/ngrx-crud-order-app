import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './store/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Order[]>(`${this.url}/orders`);
  }

  create(payload: Order) {
    return this.http.post<Order>(`${this.url}/orders`, payload);
  }

  update(payload: Order) {
    return this.http.put<Order>(`${this.url}/orders/${payload.id}`, payload);
  }

  delete(id: number) {
    return this.http.delete<Order>(`${this.url}/orders/${id}`);
  }
}
