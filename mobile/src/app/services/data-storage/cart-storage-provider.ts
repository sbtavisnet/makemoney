import { Injectable } from "@angular/core";

import { ModelCart } from "../../classes/model.cart";
import { ModelProduto } from "../../classes/model.produto";

import { CartStorageService } from "./cart-storage-service";


@Injectable({
  providedIn: "root"
})

export class CartStorageProvider {
  constructor(public storage: CartStorageService) { }

  createOrClearCart(): ModelCart {
    let cart: ModelCart = { itens: [] };
    this.storage.setCart(cart);
    return cart;
  }

  getCart(): ModelCart {
    let cart: ModelCart = this.storage.getCart();

    if (cart == null) {
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addProduto(produto: ModelProduto): ModelCart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.codpro == produto.codpro);
    if (position == -1) {
      cart.itens.push({ quantidade: 1, produto: produto });
    }
    this.storage.setCart(cart);
    return cart;
  }

  removeProduto(produto: ModelProduto): ModelCart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.codpro == produto.codpro);
    if (position != -1) {
      cart.itens.splice(position, 1);
    }
    this.storage.setCart(cart);
    return cart;
  }

  increaseQuantity(produto: ModelProduto): ModelCart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.codpro == produto.codpro);
    if (position != -1) {
      cart.itens[position].quantidade++;
    }
    this.storage.setCart(cart);
    return cart;
  }

  decreaseQuantity(produto: ModelProduto): ModelCart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.codpro == produto.codpro);
    if (position != -1) {
      cart.itens[position].quantidade--;

      if (cart.itens[position].quantidade < 1) {
        cart = this.removeProduto(produto);
      }
    }
    this.storage.setCart(cart);
    return cart;
  }

  total(): number {
    let cart = this.storage.getCart();
    let sum = 0;
    for (let i = 0; i < cart.itens.length; i++) {
      sum += cart.itens[i].produto.venda * cart.itens[i].quantidade;
    }

    return sum;
  }


}
