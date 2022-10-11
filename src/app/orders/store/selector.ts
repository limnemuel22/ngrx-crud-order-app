import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Order } from './order';

// export class OrdersSelector {}
export const selectOrders = createFeatureSelector<Order[]>('myorders');

export const selectOrderById = (orderId: number) => {
  return createSelector(selectOrders, (orders: Order[]) => {
    let orderById = orders.filter((_) => _.id === orderId);

    if (orderById.length == 0) {
      return null;
    }
    return orderById[0];
  });
};
