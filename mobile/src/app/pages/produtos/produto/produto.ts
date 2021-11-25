import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { ProdutoService } from '../../../services/produto/produto.service';
import { UtilsService } from '../../../services/utils/utils.service';


@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
  styleUrls: ['produto.scss']

})
export class ProdutoPage implements OnInit {

  listaprodutos: any[] = [];

  isDataList = true;
  limit = 10;
  page = 1;

  imagemProduto = '../../../../assets/img/produtodefault.jpg';

  descricaoatual: string;
  descricaoanterior: string;



  constructor(
    private router: Router,
    public loadingCtrl: LoadingController,
    private utils: UtilsService,
    public produtoService: ProdutoService) {
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.utils.subgrupo = null;
  }


  async getProdutos(ev: any, page = 1) {

    if (ev === undefined) {
      return;
    }

    const val: string = ev.target.value;

    if (val && val.trim() !== '' && val.length > 3) {

      const loading = await this.loadingCtrl.create({
        message: 'Aguarde..'
      });
      loading.present();

      this.descricaoatual = val.toLocaleUpperCase();
      if (this.descricaoatual !== this.descricaoanterior) {
        this.descricaoanterior = this.descricaoanterior;

        this.listaprodutos = [];
        this.isDataList = true;
      }

      this.produtoService.getProdutos(this.descricaoatual, page)
        .subscribe((data: any) => {
          if (data['success'] == false) {
            this.isDataList = false;
          }

          data['data'].forEach(element => {
            if (element['imageurl'] === undefined) {
              element['imageurl'] = this.imagemProduto;
            }
            this.listaprodutos.push(element);
          });
        })
      loading.dismiss();
    }
  }

  showFormulario(dadosProduto: any) {
    this.router.navigateByUrl('/pedido-item', { state: { dadosProduto: dadosProduto } });
  }




  popularInfinite(inifiniteScrollEvent: any) {
    if (this.isDataList) {
      this.limit += 30;
      this.page += 1;
      this.getProdutos(this.descricaoanterior, this.page);
    }
    inifiniteScrollEvent.target.complete();

  }


}
