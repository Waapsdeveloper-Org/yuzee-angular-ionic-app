import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CcNavService {

  constructor(public location: Location, public router: Router,
    public activatedRoute: ActivatedRoute) {

  }

  async setRoot(page, param = {}) {
    const extras: NavigationExtras = {
      queryParams: param
    };
    this.navigateTo(page, extras);
  }

  async push(page, param = {}) {
    const extras: NavigationExtras = {
      queryParams: param
    };
    this.navigateTo(page, extras);
  }

  async pop() {
    return new Promise<void>(async resolve => {
      this.location.back();
      resolve();
    });
  }

  navigateTo(link, data?: NavigationExtras) {
    this.router.navigate([link], data);
  }

  navigateToChild(link, data?: NavigationExtras) {
    data.relativeTo = this.activatedRoute;
    this.router.navigate([link], data);
  }

  getParams() {
    return this.activatedRoute.snapshot.params;
  }

  getQueryParams() {
    return this.activatedRoute.snapshot.queryParams;
  }

}
