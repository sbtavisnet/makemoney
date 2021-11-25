import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';

import { CONST } from '../config/const';

@Injectable()
export class AuthGuard implements CanActivate {

  private key = CONST.MAKEMONEY_MOBIL_USER;

  constructor(
    private storage: Storage,
    private route: Router) {

  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.getDados();

  }


  async getDados() {
    return await this.load()
      .then((res) => {
        if (res?.isClientConnected) {
          return true;
        };

        this.route.navigateByUrl('/login');
        return false;
      });
  }

  async load(): Promise<any> {
    return await this.storage.get(this.key);
  }

}
