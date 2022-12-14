import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  EMPTY,
  exhaustMap,
  map,
  of,
  pipe,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { setApiStatus } from 'src/app/shared/app-store/app.action';
import { Appstate } from 'src/app/shared/app-store/appstate';
import { OrdersService } from '../services/orders.service';
import {
  deleteOrderAPISuccess,
  deleteProductAPISuccess,
  invokeDeleteOrderAPI,
  invokeDeleteProductAPI,
  invokeOrdersAPI,
  invokeProductsAPI,
  invokeSaveOrderAPI,
  invokeSaveProductAPI,
  invokeUpdateOrderAPI,
  invokeUpdateProductAPI,
  ordersFetchAPISuccess,
  productsFetchAPISuccess,
  saveOrderAPISuccess,
  updateOrderAPISuccess,
  updateProductAPISuccess,
} from './actions';
import { /* selectOrders */ selectProducts } from './selector';

@Injectable()
export class StoreEffects {
  constructor(
    private actions$: Actions,
    private ordersService: OrdersService,
    private appStore: Store<Appstate>,
    private store: Store,
    private productsService: ProductsService
  ) {}

  // FOR ORDERS EFFECTS

  // loadAllOrders$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(invokeOrdersAPI),
  //     withLatestFrom(this.store.pipe(select(selectOrders))),
  //     switchMap(([, ordersFromStore]) => {
  //       if (ordersFromStore.length > 0) {
  //         return EMPTY;
  //       }
  //       return this.ordersService
  //         .get()
  //         .pipe(map((data) => ordersFetchAPISuccess({ allOrders: data })));
  //     })
  //   )
  // );

  //switchMap or mergeMap
  saveNewOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeSaveOrderAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.ordersService.create(action.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setApiStatus({
                apiStatus: {
                  apiResponseMessage: 'New order successfully Added!',
                  apiStatus: 'success',
                },
              })
            );
            return saveOrderAPISuccess({
              response: data || {
                id: 0,
                name: '',
                description: '',
                price: 0,
                status: '',
              },
            });
          })
        );
      })
    )
  );

  //switchMap or mergeMap
  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUpdateOrderAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.ordersService.update(action.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setApiStatus({
                apiStatus: {
                  apiResponseMessage: 'Update order successfully!',
                  apiStatus: 'success',
                },
              })
            );
            return updateOrderAPISuccess({ response: data });
          })
        );
      })
    )
  );

  //switchMap or mergeMap
  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeDeleteOrderAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.ordersService.delete(action.id).pipe(
          map((data) => {
            this.appStore.dispatch(
              setApiStatus({
                apiStatus: {
                  apiResponseMessage: 'Delete order successfully!',
                  apiStatus: 'success',
                },
              })
            );
            return deleteOrderAPISuccess({ id: action.id });
          })
        );
      })
    )
  );

  // FOR PRODCUTS EFFECTS

  loadAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeProductsAPI),
      withLatestFrom(this.store.pipe(select(selectProducts))),
      exhaustMap(([, productsFromStore]) => {
        if (productsFromStore.length > 0) {
          return EMPTY;
        }
        return this.productsService
          .getProductData()
          .pipe(map((data) => productsFetchAPISuccess({ allProducts: data })));
      })
    )
  );

  saveNewProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeSaveProductAPI),
      exhaustMap((action) => {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.productsService.addProductData(action.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setApiStatus({
                apiStatus: {
                  apiResponseMessage: `${action.payload.productName} successfully Added!`,
                  apiStatus: 'success',
                },
              })
            );
            return saveOrderAPISuccess({
              response: data,
            });
          })
        );
      })
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUpdateProductAPI),
      exhaustMap((action) => {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.productsService.updateProductData(action.payload).pipe(
          map((data) => {
            this.appStore.dispatch(
              setApiStatus({
                apiStatus: {
                  apiResponseMessage: `Update ${action.payload.productName}  successfully!`,
                  apiStatus: 'success',
                },
              })
            );
            return updateProductAPISuccess({ response: data });
          })
        );
      })
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeDeleteProductAPI),
      exhaustMap((action) => {
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.productsService.deleteProductData(action.product.id).pipe(
          map((data) => {
            this.appStore.dispatch(
              setApiStatus({
                apiStatus: {
                  apiResponseMessage: 'Delete order successfully!',
                  apiStatus: 'success',
                },
              })
            );
            return deleteProductAPISuccess({ product: action.product });
          })
        );
      })
    )
  );
}
