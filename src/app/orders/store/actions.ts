// export class OrdersActions {}

import { createAction, props } from '@ngrx/store';
import { Order } from './order';

export const invokeOrdersAPI = createAction(
  '[Orders API] invoke orders Fetch API'
);

export const ordersFetchAPISuccess = createAction(
  '[Orders API] orders fetch api success',
  props<{ allOrders: Order[] }>()
);

export const invokeSaveOrderAPI = createAction(
  '[Orders API] invoke save order API',
  props<{ payload: Order }>()
);

export const saveOrderAPISuccess = createAction(
  '[Orders API] save order api success',
  props<{ response: Order }>()
);

export const invokeUpdateOrderAPI = createAction(
  '[Orders API] invoke update order API',
  props<{ payload: Order }>()
);

export const updateOrderAPISuccess = createAction(
  '[Orders API] update order api success',
  props<{ response: Order }>()
);

export const invokeDeleteOrderAPI = createAction(
  '[Orders API] invoke delete order API',
  props<{ id: number }>()
);

export const deleteOrderAPISuccess = createAction(
  '[Orders API] delete order api success',
  props<{ id: number }>()
);
