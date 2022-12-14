import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from 'src/app/interfaces/product';
import { Order } from '../interfaces/order';

// export class OrdersSelector
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

// export class Product Selector
export const selectProducts = createFeatureSelector<any>('products');

export const selectProductById = (productId: number) => {
  return createSelector(selectProducts, (products: Product[]) => {
    let productById = products.filter((_) => _.id === productId);

    if (productById.length == 0) {
      return null;
    }
    return productById[0];
  });
};
