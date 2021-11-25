import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { ModelGrupo } from 'src/app/classes/model.grupo';

import { API_CONFIG } from './../../../config/api.config';
import { GrupoService } from '../../../services/grupo/grupo.service';
import { PedidoService } from '../../../services/pedidos/pedido.service';

@Component({
  selector: 'page-grupos',
  templateUrl: 'grupos.html',
  styleUrls: ['grupos.scss'],

})

export class GruposPage implements OnInit {

  urlimg = API_CONFIG.baseUrlIMG;

  listagrupo: any[] = [];
  listaFilter: any[] = [];

  isDataList = true;
  limit = 10;
  page = 1;
  qteItensCarrinho = 0;

  constructor(
    private router: Router,
    public loadingCtrl: LoadingController,
    private grupoService: GrupoService,
    private pedidoService: PedidoService
  ) {

  }

  ngOnInit() {
    this.listagrupo = [];
    this.listaFilter = [];

    this.getGrupos();

  }

  ionViewDidEnter() {
    this.itensNoCarrinho();
  }

  async itensNoCarrinho() {
    this.qteItensCarrinho = await this.pedidoService.getQteItensCarrinho();
  }


  async getGrupos() {
    const loading = await this.loadingCtrl.create({
      message: 'Aguarde..'
    });
    loading.present();
    this.grupoService.getGrupos()
      .subscribe((data: any) => {
        if (data['data'].length === 0)
          this.isDataList = false;

        data['data'].forEach(element => {
          this.listagrupo.push(element);
          this.listaFilter.push(element);
        });

      })

    loading.dismiss();

  }


  getSubGrupos(model: ModelGrupo) {
    this.router.navigateByUrl('/subgrupos', { state: { grupo: model } });

  }


  filtrar(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.listaFilter = this.listaFilter.filter((item) => {
        return (item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.listaFilter = this.listagrupo;
    }
  }


  popularInfinite(inifiniteScrollEvent: any) {
    if (this.isDataList) {
      this.limit += 10;
      this.page += 1;
      this.getGrupos();
    }
    inifiniteScrollEvent.target.complete();

  }

}
