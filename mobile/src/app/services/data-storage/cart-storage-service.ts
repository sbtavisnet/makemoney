import { Injectable } from "@angular/core";
import { CONST } from "src/app/config/const";

import { localUser } from "../../classes/local_user";
import { ModelCart } from "../../classes/model.cart";


@Injectable({
  providedIn: "root"
})

export class CartStorageService {

  getLocalUser(): localUser {
    let usr = localStorage.getItem(CONST.MAKEMONEY_MOBIL_CART);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj: localUser) {
    if (obj == null) {
      localStorage.removeItem(CONST.MAKEMONEY_MOBIL_CART);
    } else {
      localStorage.setItem(CONST.MAKEMONEY_MOBIL_CART, JSON.stringify(obj));
    }
  }

  getCart(): ModelCart {
    let cart = localStorage.getItem(CONST.MAKEMONEY_MOBIL_CART);
    if (cart != null) {
      return JSON.parse(cart);
    }
    return null;
  }

  setCart(obj: ModelCart) {
    if (obj == null) {
      localStorage.removeItem(CONST.MAKEMONEY_MOBIL_CART);
    } else {
      localStorage.setItem(CONST.MAKEMONEY_MOBIL_CART, JSON.stringify(obj));
    }
  }
}
