import { createReducer, on } from '@ngrx/store';
import {
  deleteOrderAPISuccess,
  ordersFetchAPISuccess,
  saveOrderAPISuccess,
  updateOrderAPISuccess,
} from './actions';
import { Order } from './order';

export const initialState: ReadonlyArray<Order> = [];

export const ordersReducer = createReducer(
  initialState,
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

// export class OrdersReducer {}
