import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { ordersReducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrdersEffects } from './store/effects';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [HomeComponent, AddComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('myorders', ordersReducer),
    EffectsModule.forFeature([OrdersEffects]),
    ToastrModule.forRoot(),
  ],
  exports: [HomeComponent, AddComponent],
})
export class OrdersModule {}
