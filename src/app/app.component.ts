import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'exam-ordering-app';
  constructor(private router: Router) {}
  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
