import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { productsReducer } from '../store/reducer';
import { StoreEffects } from '../store/effects';
import { ProductAddComponent } from './product-add/product-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'product-list',
    pathMatch: 'full',
  },
  {
    path: 'product-list',
    component: ProductsComponent,
  },
];
@NgModule({
  declarations: [ProductsComponent, ProductAddComponent],
  imports: [
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([StoreEffects]),
    StoreModule.forFeature('products', productsReducer),
    ToastrModule.forRoot(),
  ],
  exports: [RouterModule, ProductsComponent],
})
export class ProductsModule {}
