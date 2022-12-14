import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private toatr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.setItem('loginUser', '');
  }

  loginUser() {
    // this.userService.get().subscribe((data) => {
    //   if (this.username === 'admin') {
    //     console.log(data);
    //     let user = data
    //       .map(
    //         (person) =>
    //           person.username === this.username &&
    //           person.password === this.password
    //       )
    //       .filter((e) => e);
    //     if (user.length <= 0) {
    //       this.toatr.error('Invalid username or password');
    //     }
    //     if (user.length > 0) {
    //       this.router.navigate(['/admin']);
    //     }
    //     localStorage.setItem('loginUser', 'admin');
    //   }
    //   if (this.username === 'user') {
    //     console.log(data);
    //     let user = data
    //       .map(
    //         (person) =>
    //           person.username === this.username &&
    //           person.password === this.password
    //       )
    //       .filter((e) => e);
    //     if (user.length <= 0) {
    //       this.toatr.error('Invalid username or password');
    //     }
    //     if (user.length > 0) {
    //       this.router.navigate(['/orders']);
    //     }
    //     localStorage.setItem('loginUser', 'user');
    //   }
    //   if (this.username !== 'admin' && this.username !== 'user') {
    //     this.toatr.error('Invalid username or password');
    //     localStorage.setItem('loginUser', '');
    //   }
    // });
  }
}
