import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { AlertController } from '@ionic/angular';

import { ModelPedido } from 'src/app/classes/model.pedido';
import { API_CONFIG } from 'src/app/config/api.config';
import { CONST } from 'src/app/config/const';

import { ModelPedidoItens } from '../../classes/model.pedido.itens';



@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  url = API_CONFIG.baseUrl;




  constructor(public http: HttpClient) { }

  async get() {
    let pedido = localStorage.getItem(CONST.MAKEMONEY_MOBIL_CART);
    if (pedido != null) {
      return await JSON.parse(pedido);
    }
    return null;

  }


  async add(modelPedidoItens) {
    let pedidoItens: ModelPedidoItens[] = [];
    const dados = await this.get();
    if (dados != null) {
      pedidoItens = dados;
      pedidoItens.push(modelPedidoItens);
    }
    else {
      pedidoItens.push(modelPedidoItens);
    };
    localStorage.setItem(CONST.MAKEMONEY_MOBIL_CART, JSON.stringify(pedidoItens));

  }


  async finalizarPedido(cliente,
    formapag,  // 1 = dinheiro 2 = cartao    
    valorped,
    valorpago,
    taxa,
    observacao): Promise<any> {

    //let pedidoItens: ModelPedidoItens[] = [];
    let obj: any;
    let pedido: any;
    const dados = await this.get();

    if (dados != null) {
      obj = {
        'cliente': cliente,
        'formapag': formapag,
        'valor': valorped,
        'valorpago': valorpago > 0 ? valorpago : valorped,
        'taxa': taxa,
        'observacao': observacao,
        'produto': dados
      };
      pedido = obj;

    };
    return await pedido;

  }


  async delete(modelPedido) {
    const pedido = await this.get();
    const position = pedido.findIndex(x => x.codpro == modelPedido.codpro);
    if (position != -1) {
      pedido.splice(position, 1);
      localStorage.setItem(CONST.MAKEMONEY_MOBIL_CART, JSON.stringify(pedido));
    }

    return await pedido;

  }


  async getCart() {
    const pedido = localStorage.getItem(CONST.MAKEMONEY_MOBIL_CART);

    if (pedido != null) {
      return await JSON.parse(pedido);
    }
    return null;
  }


  async getQteItensCarrinho() {
    let pedido = await JSON.parse(localStorage.getItem(CONST.MAKEMONEY_MOBIL_CART));
    let itensCarrinho = 0;

    if (pedido === null || pedido === undefined)
      return itensCarrinho;
    itensCarrinho = pedido.length;
    return itensCarrinho;

  }



  totalPedido(modelPedido: ModelPedido) {

    let sum = 0;
    for (const prop in modelPedido) {
      sum += modelPedido[prop].venda * modelPedido[prop].quantidade;
    }
    return sum;
  }


  async incrementaQte(codpro) {
    const pedido = await this.getCart();
    const position = pedido.findIndex(x => x.codpro == codpro);

    if (position != -1) {
      pedido[position].quantidade++;
    }
    localStorage.setItem(CONST.MAKEMONEY_MOBIL_CART, JSON.stringify(pedido));
    return await pedido;
  }



  async decrementaQte(codpro) {
    let pedido = await this.getCart();
    const position = pedido.findIndex(x => x.codpro == codpro);
    if (position != -1) {
      --pedido[position].quantidade;
      if (pedido[position].quantidade < 1) {
        pedido = await this.delete(pedido[position]);
      }
    }
    localStorage.setItem(CONST.MAKEMONEY_MOBIL_CART, JSON.stringify(pedido));
    return await pedido;

  }

  async RemoveAll(): Promise<ModelPedido[]> {
    let pedido: ModelPedido[] = [];
    localStorage.setItem(CONST.MAKEMONEY_MOBIL_CART, JSON.stringify(pedido));
    return await pedido;
  }



  async enviarPedido(model: any) {
    const uri = this.url + 'pedidos';
    const obj: string = JSON.stringify(model);


    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    const dados = obj;

    await this.http.post(uri, dados, { headers }).subscribe(res => {
      return res;
    }),
      error => {
        console.log(error);
      };
  }


}
