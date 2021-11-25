import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CONST } from 'src/app/config/const';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

import { ModelCliente } from '../../../classes/model.cliente';
import { EFormaPagamento } from '../../../enums/eformadepagamento';
import { ClienteStorageService } from '../../../services/data-storage/cliente-storage-service';





@Component({
  selector: 'app-pedido-finalizar',
  templateUrl: 'pedido-finalizar.page.html',
  styleUrls: ['pedido-finalizar.page.scss'],
})
export class PedidoFinalizarPage implements OnInit {

  dadosProduto: any;
  modelCliente: ModelCliente;
  totalPedido: number;
  eformaPagamento = EFormaPagamento;
  tipoFormaPagamento = 0;
  valorpago: number;
  taxa = 0;

  observacao: any;


  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService,
    private clienteStorageService: ClienteStorageService,
    private utilService: UtilsService) {
    this.dadosProduto = JSON.parse(
      this.activeRoute.snapshot.paramMap.get('produtosNoCarrinho')
    );

  }

  ngOnInit() {
    this.getDados();
  }



  async getDados() {

    this.totalPedido = await this.pedidoService.totalPedido(this.dadosProduto);

    // pega o cliente do storage
    await this.clienteStorageService.load()
      .then(res => {
        this.modelCliente = res
      })
      .catch(error => {
        console.log(error)
      });


  }

  // get getEnum() {
  //   return this.eformaPagamento;
  // }



  async finalizarPedido(dadosProduto) {
    this.utilService.menssagem('Enviando o pedido !!!');
    let totalPed = Number(this.totalPedido).toFixed(2);
    let valPago = Number(this.valorpago).toFixed(2);

    const pedido = await this.pedidoService.finalizarPedido(this.modelCliente,
      this.tipoFormaPagamento,
      totalPed,
      valPago,
      this.taxa,
      this.observacao);

    await this.pedidoService.enviarPedido(pedido);

    await this.router.navigateByUrl('/home');

    // removendo o pedido do localstoarage
    localStorage.removeItem(CONST.MAKEMONEY_MOBIL_CART);


  }


  valida(): boolean {
    let retorno = true;

    if (this.tipoFormaPagamento === 0) {
      retorno = false
    };

    if (this.tipoFormaPagamento === 1) {
      if (this.valorpago < this.totalPedido) {
        retorno = false
      };
      // tslint:disable-next-line: curly
      if (this.valorpago === undefined)
        retorno = false;
    }

    return retorno;
  }



}
