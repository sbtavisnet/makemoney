import { Injectable } from "@angular/core";

import { ModelCart } from 'src/app/classes/model.cart';
import { ModelProduto } from 'src/app/classes/model.produto';

import { CartStorageService } from './cart-storage-service';

@Injectable({
  providedIn: "root"
})


export class CartService {

  constructor(public storage: CartStorageService) { }

  createOrClearCart(): ModelCart {
    const cart: ModelCart = { itens: [] };
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
    const cart = this.getCart();
    const position = cart.itens.findIndex(x => x.produto.codpro == produto.codpro);
    if (position == -1) {
      cart.itens.push({ quantidade: 1, produto: produto });
    }
    this.storage.setCart(cart);
    return cart;
  }

  removeProduto(produto: ModelProduto): ModelCart {
    const cart = this.getCart();
    const position = cart.itens.findIndex(x => x.produto.codpro == produto.codpro);
    if (position !== -1) {
      cart.itens.splice(position, 1);
    }
    this.storage.setCart(cart);
    return cart;
  }

  increaseQuantity(produto: ModelProduto): ModelCart {
    let cart = this.getCart();
    const position = cart.itens.findIndex(x => x.produto.codpro == produto.codpro);
    if (position !== -1) {
      cart.itens[position].quantidade++;
    }
    this.storage.setCart(cart);
    return cart;
  }

  decreaseQuantity(produto: ModelProduto): ModelCart {
    let cart = this.getCart();
    const position = cart.itens.findIndex(x => x.produto.codpro == produto.codpro);
    if (position !== -1) {
      cart.itens[position].quantidade--;

      if (cart.itens[position].quantidade < 1) {
        cart = this.removeProduto(produto);
      }
    }
    this.storage.setCart(cart);
    return cart;
  }

  total(): number {
    const cart = this.storage.getCart();
    let sum = 0;
    for (let i = 0; i < cart.itens.length; i++) {
      sum += cart.itens[i].produto.venda * cart.itens[i].quantidade;
    }

    return sum;
  }
}
