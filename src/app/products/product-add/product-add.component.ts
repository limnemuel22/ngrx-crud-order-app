import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { setApiStatus } from 'src/app/shared/app-store/app.action';
import { selectAppState } from 'src/app/shared/app-store/app.selector';
import { Appstate } from 'src/app/shared/app-store/appstate';
import {
  invokeSaveProductAPI,
  invokeUpdateProductAPI,
} from 'src/app/store/actions';

import { selectProductById } from 'src/app/store/selector';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    productName: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0),
    quantity: new FormControl(1),
  });

  @Output() actions = new EventEmitter();
  @Input() formName = 'Add';
  loginUser: string = 'user';
  statusList: Array<string> = ['Approved', 'Pending', 'Reject'];

  _productId!: number;
  get productId(): any {
    return this._productId;
  }
  @Input() set productId(value: number) {
    if (value === 0) {
      this.productForm.reset();
    }
    if (value) {
      this._productId = value;
      if (this.productId) {
        let fetchFromData$ = this.store.pipe(
          select(selectProductById(this.productId))
        );
        console.log(fetchFromData$);
        fetchFromData$.subscribe((data) => {
          this.productForm.controls['productName'].patchValue(
            data?.productName
          );
          this.productForm.controls['description'].patchValue(
            data?.description
          );
          this.productForm.controls['price'].patchValue(data?.price);
          this.productForm.controls['quantity'].patchValue(data?.quantity);
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

  ngOnInit(): void {}

  save() {
    if (this.productId) {
      return this.updateProduct();
    }
    console.log(this.productForm.value);
    this.store.dispatch(
      invokeSaveProductAPI({
        payload: { ...this.productForm.value },
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
    this.productForm.reset();
  }

  updateProduct() {
    this.store.dispatch(
      invokeUpdateProductAPI({
        payload: { ...this.productForm.value, id: this.productId },
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
    this.productForm.reset();
  }
}
