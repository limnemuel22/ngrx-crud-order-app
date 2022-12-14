import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subject, tap } from 'rxjs';
import { selectProducts } from '../store/selector';
import { ProductsService } from '../services/products.service';
import { invokeDeleteProductAPI, invokeProductsAPI } from '../store/actions';
import { Product } from '../interfaces/product';
import { Appstate } from '../shared/app-store/appstate';
import { ToastrService } from 'ngx-toastr';
import { selectAppState } from '../shared/app-store/app.selector';
import { setApiStatus } from '../shared/app-store/app.action';

declare var window: any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  showCreateUpdateNewOrder: boolean = false;
  formName: string = 'Add';
  productRowData: Product = {
    id: 0,
    productName: '',
    description: '',
    price: 0,
    quantity: 0,
  };
  deleteModal: any;
  deleteProductData: Product = {
    id: 0,
    productName: '',
    description: '',
    price: 0,
    quantity: 0,
  };
  disableButton: boolean = false;

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private toastr: ToastrService
  ) {}

  products$: Observable<any> = this.store.pipe(select(selectProducts));

  ngOnInit() {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    this.store.dispatch(invokeProductsAPI());
  }

  addNewProduct() {
    this.showCreateUpdateNewOrder = true;
    this.formName = 'Add';
    this.productRowData = {
      id: 0,
      productName: '',
      description: '',
      price: 0,
      quantity: 0,
    };
  }

  closeAddEditForm(event: string) {
    this.formName = 'Add';
    if (event === 'close-add-update-section') {
      this.showCreateUpdateNewOrder = false;
    }
  }

  editProduct(data: Product) {
    this.productRowData = data;
    this.formName = 'Update';
    this.showCreateUpdateNewOrder = true;
  }

  openDeleteModal(product: any) {
    this.deleteProductData = product;
    this.deleteModal.show();
  }

  confirmDelete() {
    this.disableButton = true;
    this.store.dispatch(
      invokeDeleteProductAPI({ product: this.deleteProductData })
    );
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        if (data.apiResponseMessage)
          this.toastr.success(data.apiResponseMessage);
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
        this.deleteModal.hide();
        this.disableButton = false;
      }
    });
  }
}
