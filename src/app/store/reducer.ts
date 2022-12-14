import { createReducer, on } from '@ngrx/store';
import {
  deleteOrderAPISuccess,
  ordersFetchAPISuccess,
  productsFetchAPISuccess,
  saveOrderAPISuccess,
  saveProductAPISuccess,
  updateOrderAPISuccess,
  updateProductAPISuccess,
} from './actions';
import { Order } from '../interfaces/order';
import { Product } from 'src/app/interfaces/product';

// FOR ORDERS

export const initialOrderState: ReadonlyArray<Order> = [];

export const ordersReducer = createReducer(
  initialOrderState,
  on(ordersFetchAPISuccess, (state, { allOrders }) => {
    return allOrders;
  }),
  on(saveOrderAPISuccess, (state, { response }) => {
    let newState = [...state];
    newState.push(response);
    return newState;
  }),
  on(updateOrderAPISuccess, (state, { response }) => {
    let newState = state.filter((_) => _.id !== response.id);
    newState.unshift(response);
    return newState;
  }),
  on(deleteOrderAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.id !== id);
    return newState;
  })
);

// FOR PRODICTS

export const initialProductState: Array<Product> = [];
export const productsReducer = createReducer(
  initialProductState,
  on(productsFetchAPISuccess, (state, { allProducts }) => {
    let newState = state;
    if (allProducts) {
      newState = allProducts;
    }
    return newState;
  }),
  on(saveProductAPISuccess, (state, { response }) => {
    let newState = [...state];
    newState.push(response);
    return newState;
  }),
  on(updateProductAPISuccess, (state, { response }) => {
    let newState = state;
    if (response) {
      newState = state.filter((_) => _.id !== response.id);
      newState.unshift(response);
    }
    return newState;
  }),
  on(deleteOrderAPISuccess, (state, { id }) => {
    let newState = state;
    if (id) {
      newState = state.filter((_) => _.id !== id);
    }
    return newState;
  })
);
