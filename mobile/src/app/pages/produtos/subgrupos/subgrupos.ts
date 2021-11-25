import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ModelSubGrupo } from 'src/app/classes/model.subgrupo';
import { UtilsService } from 'src/app/services/utils/utils.service';

import { ModelGrupo } from '../../../classes/model.grupo';
import { GrupoService } from '../../../services/grupo/grupo.service';
import { PedidoService } from '../../../services/pedidos/pedido.service';

@Component({
  selector: 'page-subgrupos',
  templateUrl: 'subgrupos.html',
  styleUrls: ['subgrupos.scss'],
})

export class SubGruposPage implements OnInit {

  public listasubgrupo: any[] = [];

  public modelGrupo: ModelGrupo;
  qteItensCarrinho = 0;
  constructor(
    private router: Router,
    private utils: UtilsService,
    private grupoService: GrupoService,
    private pedidoService: PedidoService

  ) {
    this.modelGrupo = this.router.getCurrentNavigation().extras.state.grupo;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getSubGrupos(this.modelGrupo);
    this.itensNoCarrinho();

  }

  async itensNoCarrinho() {
    this.qteItensCarrinho = await this.pedidoService.getQteItensCarrinho();
  }



  getSubGrupos(model: ModelGrupo) {

    const loading = this.utils.showLoading();
    loading.then(() => {
      this.grupoService.getSubGrupos(model.codigo)
        .subscribe((data: any) => {
          this.listasubgrupo = data['data'];
        })
    })
  }


  showProdutos(model: ModelSubGrupo) {
    this.utils.subgrupo = model;
    this.router.navigateByUrl('/produtogrupo', { state: { subgrupo: model } });
  }

}