import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../interfaces/order';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  get() {
    // return this.http.get<Order[]>(`${this.url}/orders`);
    return of([
      {
        id: 0,
        name: '',
        description: '',
        price: 0,
        status: '',
      },
    ]);
  }

  create(payload: Order) {
    // return this.http.post<Order>(`${this.url}/orders`, payload);
    return of([
      {
        id: 0,
        name: '',
        description: '',
        price: 0,
        status: '',
      },
    ]);
  }

  update(payload: Order) {
    // return this.http.put<Order>(`${this.url}/orders/${payload.id}`, payload);
    return of([
      {
        id: 0,
        name: '',
        description: '',
        price: 0,
        status: '',
      },
    ]);
  }

  delete(id: number) {
    // return this.http.delete<Order>(`${this.url}/orders/${id}`);
    return of([
      {
        id: 0,
        name: '',
        description: '',
        price: 0,
        status: '',
      },
    ]);
  }
}
