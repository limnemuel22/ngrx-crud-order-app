import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
})
export class TopNavigationComponent implements OnInit {
  tabList: Array<any> = [
    { path: 'products', name: 'Products' },
    { path: 'orders', name: 'Orders' },
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}
  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
