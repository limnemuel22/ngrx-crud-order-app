import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { ordersReducer } from '../store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreEffects } from '../store/effects';
import { AddOrderComponent } from './order-add/order-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { OrdersComponent } from './orders.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'order-list',
    pathMatch: 'full',
  },
  {
    path: 'order-list',
    component: OrdersComponent,
  },
];
@NgModule({
  declarations: [OrdersComponent, AddOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('myorders', ordersReducer),
    EffectsModule.forFeature([StoreEffects]),
    ToastrModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class OrdersModule {}
