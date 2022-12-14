import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { setApiStatus } from 'src/app/shared/app-store/app.action';
import { selectAppState } from 'src/app/shared/app-store/app.selector';
import { Appstate } from 'src/app/shared/app-store/appstate';
import { invokeSaveOrderAPI, invokeUpdateOrderAPI } from '../../store/actions';
import { Order } from '../../interfaces/order';
import { selectOrderById } from '../../store/selector';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss'],
})
export class AddOrderComponent implements OnInit {
  ordersForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0),
    status: new FormControl('pending'),
  });

  @Output() actions = new EventEmitter();
  @Input() formName = 'Add';
  _orderId!: number;

  get orderId(): any {
    return this._orderId;
  }

  loginUser: string = 'user';

  statusList: Array<string> = ['Approved', 'Pending', 'Reject'];

  @Input() set orderId(value: number) {
    if (value === 0) {
      console.log(value);
      this.ordersForm.reset();
    }
    if (value) {
      this._orderId = value;
      if (this.orderId) {
        let fetchFromData$ = this.store.pipe(
          select(selectOrderById(this.orderId))
        );
        console.log(fetchFromData$);
        fetchFromData$.subscribe((data) => {
          this.ordersForm.controls['name'].patchValue(data?.name);
          this.ordersForm.controls['description'].patchValue(data?.description);
          this.ordersForm.controls['price'].patchValue(data?.price);
          this.ordersForm.controls['status'].patchValue(data?.status);
        });
      }
    }
  }

  constructor(
    private store: Store,
    private toastr: ToastrService,
    private appStore: Store<Appstate>,
    private rf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loginUser = localStorage.getItem('loginUser') || '';
  }

  save() {
    if (this.orderId) {
      return this.updateOrder();
    }
    console.log(this.ordersForm.value);
    this.store.dispatch(
      invokeSaveOrderAPI({
        payload: { ...this.ordersForm.value },
      })
    );
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        if (data.apiResponseMessage)
          this.toastr.success(data.apiResponseMessage);
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
      }
      this.actions.emit('close-add-update-section');
    });
    this.ordersForm.reset();
  }

  updateOrder() {
    this.store.dispatch(
      invokeUpdateOrderAPI({
        payload: { ...this.ordersForm.value, id: this.orderId },
      })
    );

    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        if (data.apiResponseMessage)
          this.toastr.success(data.apiResponseMessage);
        this.appStore.dispatch(
          setApiStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
        );
      }
      this.actions.emit('close-add-update-section');
    });
    this.ordersForm.reset();
  }
}
