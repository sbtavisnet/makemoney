import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private storage: Storage, private navCtrl: NavController) {}

  canActivate() {
    const user = this.storage.get("ilutero");
    if (!user) {
      this.navCtrl.navigateRoot("login");
      return false;
    }

    return true;
  }
}
