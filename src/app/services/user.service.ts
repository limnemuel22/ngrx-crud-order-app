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

  /*  public authValidate() {
    const authToken = localStorage.getItem("es-token");
    if (authToken) {
      this.http.post("/users/token/refresh", { token: authToken })
        .then((res: any) => {
          localStorage.setItem("es-token", res.data.token);
        })
        .catch(error => {
          this.logout();
        });
      return true;
    } else {
      this.router.navigate([""]);
      return false;
    }
  } */
}
