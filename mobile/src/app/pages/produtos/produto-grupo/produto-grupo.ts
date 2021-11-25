import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ModelSubGrupo } from 'src/app/classes/model.subgrupo';
import { UtilsService } from 'src/app/services/utils/utils.service';

import { PedidoService } from '../../../services/pedidos/pedido.service';
import { ProdutoService } from '../../../services/produto/produto.service';

@Component({
  selector: 'page-produto-grupo',
  templateUrl: 'produto-grupo.html',
  styleUrls: ['produto-grupo.scss'],
})

export class ProdutoGrupoPage implements OnInit {

  listaprodutos: any[] = [];
  listaFilter: any[] = [];

  searchText: string = null;

  modelSubGrupo: ModelSubGrupo;

  isDataList = true;
  limit = 10;
  page = 1;
  qteItensCarrinho = 0;

  imagemProduto = '../../../../assets/img/produtodefault.jpg';

  constructor(
    private router: Router,
    public produtoService: ProdutoService,
    public pedidoService: PedidoService) {

    this.modelSubGrupo = this.router.getCurrentNavigation().extras.state.subgrupo;
  }


  ngOnInit() {
    this.getProdutosSubGupos(this.modelSubGrupo.grupo,
      this.modelSubGrupo.subgrupo,
      '');
  }

  ionViewDidEnter() {
    this.itensNoCarrinho();
  }


  async itensNoCarrinho() {
    this.qteItensCarrinho = await this.pedidoService.getQteItensCarrinho();
  }


  getProdutosSubGupos(grupo, subgrupo, despro: string) {
    this.produtoService.getProdutosSubGrupos(grupo, subgrupo, despro, this.page)
      .subscribe((data: any) => {

        if (data['data']?.length === 0)
          this.isDataList = false;

        data['data']?.forEach(element => {
          if (element['imageurl'] == undefined)
            element['imageurl'] = this.imagemProduto;

          this.listaprodutos.push(element);
          this.listaFilter.push(element);

        });

      })
  }


  filtrar(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.listaFilter = this.listaFilter.filter((item) => {
        return (item.despro.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.listaFilter = this.listaprodutos;
    }
  }


  showDetail(codpro) {
    this.router.navigateByUrl('/pedido', { state: { produto_codpro: codpro } });
  }

  showPedidoItem(dadosProduto) {
    this.router.navigateByUrl('/pedido-item', { state: { dadosProduto: dadosProduto } });
  }


  popularInfinite(inifiniteScrollEvent: any) {
    if (this.isDataList) {
      this.limit += 30;
      this.page += 1;
      this.getProdutosSubGupos(this.modelSubGrupo.grupo,
        this.modelSubGrupo.subgrupo,
        this.searchText);
    }
    inifiniteScrollEvent.target.complete();

  }


}
