import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, of, switchMap, withLatestFrom } from 'rxjs';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { OrdersService } from '../orders.service';
import {
  deleteOrderAPISuccess,
  invokeDeleteOrderAPI,
  invokeOrdersAPI,
  invokeSaveOrderAPI,
  invokeUpdateOrderAPI,
  ordersFetchAPISuccess,
  saveOrderAPISuccess,
  updateOrderAPISuccess,
} from './actions';
import { selectOrders } from './selector';

@Injectable()
export class OrdersEffects {
  constructor(
    private actions$: Actions,
    private ordersService: OrdersService,
    private appStore: Store<Appstate>,
    private store: Store
  ) {}

  loadAllOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeOrdersAPI),
      withLatestFrom(this.store.pipe(select(selectOrders))),
      switchMap(([, ordersFromStore]) => {
        if (ordersFromStore.length > 0) {
          return EMPTY;
        }
        return this.ordersService
          .get()
          .pipe(map((data) => ordersFetchAPISuccess({ allOrders: data })));
      })
    )
  );

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
            return saveOrderAPISuccess({ response: data });
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
}
