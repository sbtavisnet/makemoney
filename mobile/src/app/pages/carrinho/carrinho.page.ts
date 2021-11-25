import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { PedidoService } from 'src/app/services/pedidos/pedido.service';
import { UtilsService } from 'src/app/services/utils/utils.service';


@Component({
  selector: 'app-carrinho',
  templateUrl: 'carrinho.page.html',
  styleUrls: ['carrinho.page.scss']
})

export class CarrinhoPage implements OnInit {

  produtoNoCarrinho: any;
  totalPedido: number;

  grupo: string;
  subgrupo: string;

  imagemProduto = '../../../assets/img/produtodefault.jpg';


  constructor(private router: Router,
    private alertCtrl: AlertController,
    private pedidoService: PedidoService,
    private utilService: UtilsService) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.getCart();
  }

  async getCart() {
    this.produtoNoCarrinho = await this.pedidoService.getCart();
    this.totalPedido = await this.pedidoService.totalPedido(this.produtoNoCarrinho);

  }


  async incrementa(dadosProduto) {
    await this.pedidoService.incrementaQte(dadosProduto.codpro);
    await this.getCart();


  }

  async decrementa(dadosProduto) {

    const quantidade = --dadosProduto.quantidade;

    if (quantidade < 1) {
      await this.removerItemCarrinho(dadosProduto);
      await this.getCart();

    }
    else {
      await this.pedidoService.decrementaQte(dadosProduto.codpro);
    }

    await this.getCart();

  }


  async removerItemCarrinho(pedido) {
    const alert = await this.alertCtrl.create({
      message: 'Deseja remover esse produto do carrinho ?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'danger',
          handler: (data) => {
          }
        },
        {
          text: 'Remover',
          cssClass: 'success',
          handler: (data) => {
            this.pedidoService.delete(pedido);
            this.utilService.menssagem('Produto retirado do carrinho !!!');

          }
        }
      ]
    });
    await alert.present();
    await alert.onDidDismiss();


  }

  showFormulario() {
    this.router.navigate(['pedido-finalizar',
      JSON.stringify(this.produtoNoCarrinho)]);
  }


  showEndereco() {
    this.router.navigateByUrl('/enderecosentrega');
  }

}
