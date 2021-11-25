import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PedidoService } from '../../services/pedidos/pedido.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})

export class MenuHeaderComponent implements OnInit {

  qteItensCarrinho = 0;

  @Input() titulo: string;

  constructor(private router: Router,
    private pedidoService: PedidoService) {
  }

  ngOnInit() {
    this.itensNoCarrinho();
  }


  async itensNoCarrinho() {
    this.qteItensCarrinho = await this.pedidoService.getQteItensCarrinho();
  }

  onShow() {
    this.router.navigateByUrl('/carrinho');
  }

}
