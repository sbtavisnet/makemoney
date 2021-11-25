import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'page-minha-compra-itens',
  templateUrl: 'minha-compra-itens.html',
  styleUrls: ['minha-compra-itens.scss'],
})
export class MinhaCompraItensPage {

  public dadosPedidoItens: any;

  constructor(private activeRoute: ActivatedRoute) {

    this.dadosPedidoItens = JSON.parse(
      this.activeRoute.snapshot.paramMap.get('dadosItens'));
  }

  public soma(item: any) {
    let totalItem: number;

    totalItem = (parseFloat(item.quant) *
      parseFloat(item.preco) *
      (1 - parseFloat(item.desconto1) / 100));
    return totalItem;

  }

}
