import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { ModelCliente } from 'src/app/classes/model.cliente';
import { ModelPedido } from 'src/app/classes/model.pedido';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';

import { ModelPedidoItens } from '../../../classes/model.pedido.itens';
import { ModelProduto } from '../../../classes/model.produto';
import { ModelProdutoRequest } from '../../../classes/model.produto.request';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { UserStorageService } from '../../../services/data-storage/user-storage-service';
import { UtilsService } from '../../../services/utils/utils.service';


@Component({
  selector: 'app-pedido-item',
  templateUrl: './pedido-item.page.html',
  styleUrls: ['./pedido-item.page.scss']
})
export class PedidoItemPage implements OnInit {
  dadosProduto = new ModelProduto();
  quantidade = 1;
  totalItem = 0;

  dadosPedido = new ModelPedido();
  dadosPedidoItens = new ModelPedidoItens();
  codcli: string;

  modelCliente = new ModelCliente();

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private storge: UserStorageService,
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private utils: UtilsService
  ) {

    // this.dadosProduto = JSON.parse(
    //   this.activeRoute.snapshot.paramMap.get("dadosProduto")
    // );

    this.dadosProduto = this.router.getCurrentNavigation().extras.state.dadosProduto;
    console.log('pedido-item', this.dadosProduto);

  }

  async getConfiguracao() {
    await this.storge
      .getConfiguracao()
      .then((res: any) => {
        if (res.codcli) {
          this.codcli = res.codcli;
        }
      });
  }

  ngOnInit() {
    this.showDados();

  }

  async showDados() {
    await this.getConfiguracao();

    await this.getClienteCodigo(this.codcli);

    await this.somaItem(this.dadosProduto);



  }

  async getClienteCodigo(codcli: string) {

    await this.clienteService.getClienteCodigo(codcli)
      .then((res) => {
        this.modelCliente = res['data'];
      })

  }


  incrementa(dadosProduto) {
    this.quantidade++;

    this.somaItem(dadosProduto);
  }

  decrementa(dadosProduto) {
    this.quantidade--;
    if (this.quantidade < 1) {
      this.quantidade = 1;
    }
    this.somaItem(dadosProduto);
  }

  somaItem(dadosProduto?) {
    this.totalItem = dadosProduto.venda * this.quantidade;
  }


  async saveItem(dadosProduto) {
    // itens - interface
    const modelProdutoRequest: ModelProdutoRequest = {
      codpro: dadosProduto.codpro,
      despro: dadosProduto.despro,
      venda: dadosProduto.venda,
      coduni: dadosProduto.coduni,
      quantidade: this.quantidade,
      desconto1: 0,
      imageurl: dadosProduto.IMAGEURL === undefined ? '' : dadosProduto.imageurl

    }

    await this.pedidoService.add(modelProdutoRequest);
    // carrinho de compras
    this.carrinho();

  }

  async carrinho() {
    const alert = await this.alertCtrl.create({
      subHeader: 'Produto adicionado',
      message: 'Deseja continuar comprando ou ver o seu carrinho ?',
      buttons: [
        {
          text: 'Continuar Comprado',
          handler: data => {
            if (this.utils.subgrupo === null) {
              this.router.navigateByUrl('/produto')
            } else if (this.utils.subgrupo !== null) {
              this.router.navigateByUrl('/produtogrupo', { state: { subgrupo: this.utils.subgrupo } });
            }
          }
        },
        {
          text: 'Ir para o carrinho',
          handler: data => {
            this.router.navigateByUrl('/carrinho');
          }
        }
      ]
    });
    await alert.present();
  }


}
