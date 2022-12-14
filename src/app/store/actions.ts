// export class OrdersActions {}

import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/interfaces/product';
import { Order } from '../interfaces/order';

//  FOR ORDERS
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
  props<{ response: any }>()
);

export const invokeUpdateOrderAPI = createAction(
  '[Orders API] invoke update order API',
  props<{ payload: Order }>()
);

export const updateOrderAPISuccess = createAction(
  '[Orders API] update order api success',
  props<{ response: any }>()
);

export const invokeDeleteOrderAPI = createAction(
  '[Orders API] invoke delete order API',
  props<{ id: number }>()
);

export const deleteOrderAPISuccess = createAction(
  '[Orders API] delete order api success',
  props<{ id: number }>()
);

// FOR PRODUCTS

export const invokeProductsAPI = createAction(
  '[Products API] invoke products Fetch API'
);
export const productsFetchAPISuccess = createAction(
  '[Products API] products fetch api success',
  props<{ allProducts: Product[] }>()
);
export const invokeSaveProductAPI = createAction(
  '[Products API] invoke save Product API',
  props<{ payload: Product }>()
);

export const saveProductAPISuccess = createAction(
  '[Products API] save product api success',
  props<{ response: Product }>()
);

export const invokeUpdateProductAPI = createAction(
  '[Product API] invoke update product API',
  props<{ payload: Product }>()
);

export const updateProductAPISuccess = createAction(
  '[Product API] update product api success',
  props<{ response: Product }>()
);

export const invokeDeleteProductAPI = createAction(
  '[Products API] invoke delete product API',
  props<{ product: any }>()
);

export const deleteProductAPISuccess = createAction(
  '[Products API] delete product api success',
  props<{ product: any }>()
);
