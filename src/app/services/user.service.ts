import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<User[]>(`${this.url}/users`);
  }
}
