import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionSnapshots,
  Firestore,
  getDocs,
  query,
} from '@angular/fire/firestore';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { catchError, from, of, map, Observable, Subject } from 'rxjs';

import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public unsubscribeComponent$ = new Subject<void>();
  public unsubscribe$ = this.unsubscribeComponent$.asObservable();

  constructor(private fireStore: Firestore) {}

  getProductData(): Observable<Product[]> {
    // table name
    // const data = collection(this.store, 'events');
    const data = collection(this.fireStore, 'products');
    // for querying ex: where clause
    const newQueryData = query(
      data
      // where('eventDate', '==', '12/8/2022'),
      // orderBy('eventName', 'asc')
    );
    return from(
      collectionSnapshots(newQueryData).pipe(
        catchError((error) => {
          return error.code;
        }),
        map((res: any) => {
          return res.map((doc: any) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
        })
      )
    );
  }

  addProductData(payload: any = {}): Observable<Product> {
    // table name // collection means all data
    const data = collection(this.fireStore, 'products');
    // function to call
    return from(
      // get specific data
      addDoc(data, payload)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error.code;
        })
    );
  }

  updateProductData(payload: any): Observable<Product> {
    // table name // doc delete specific data
    const data = doc(this.fireStore, `products/`, payload.id);
    // function to call
    return from(
      // get specific data
      updateDoc(data, payload)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error.code;
        })
    );
  }

  deleteProductData(id: string): Observable<any> {
    // table name // doc delete specific data
    const data = doc(this.fireStore, `products/`, id);
    // function to call
    return from(
      // get specific data
      deleteDoc(data)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error.code;
        })
    );
  }
}
