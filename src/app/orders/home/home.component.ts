import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokeDeleteOrderAPI, invokeOrdersAPI } from '../store/actions';
import { Order } from '../store/order';
import { selectOrders } from '../store/selector';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  createUpdateNewOrder: boolean = false;
  orderRowData: Order = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    status: '',
  };
  formName: string = 'Add';
  deleteModal: any;
  idToDelete: number = 0;

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private toastr: ToastrService
  ) {}

  orders$ = this.store.pipe(select(selectOrders));
  disableButton: boolean = false;

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    this.store.dispatch(invokeOrdersAPI());
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  confirmDelete() {
    this.disableButton = true;
    this.store.dispatch(invokeDeleteOrderAPI({ id: this.idToDelete }));
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

  addNewOrder() {
    this.createUpdateNewOrder = true;
    this.formName = 'Add';
    this.orderRowData = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      status: '',
    };
  }

  closeAddEditForm(event: string) {
    this.formName = 'Add';
    if (event === 'close-add-update-section') {
      this.createUpdateNewOrder = false;
    }
  }

  editOrder(data: Order) {
    this.orderRowData = data;
    this.formName = 'Update';
    this.createUpdateNewOrder = true;

    console.log(this.orderRowData);
  }
}
