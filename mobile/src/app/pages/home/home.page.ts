import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PedidoService } from 'src/app/services/pedidos/pedido.service';

import { UserStorageService } from '../../services/data-storage/user-storage-service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {


    public data: any;
    public minhaAplicacao = "ECommerce Makemoney";

    qteItensCarrinho = 0;


    constructor(
        private router: Router,
        private dataStorageService: UserStorageService,
        private pedidoService: PedidoService) {

        this.data = dataStorageService.modelUser;

    }

    ngOnInit() {
    }
    ionViewDidEnter() {
        this.itensNoCarrinho();
    }

    async itensNoCarrinho() {
        this.qteItensCarrinho = await this.pedidoService.getQteItensCarrinho();
    }

    openPage(pagina) {

        this.router.navigateByUrl(pagina)

    }


    goSair() {
        this.dataStorageService.remove();

    }




}