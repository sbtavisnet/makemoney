import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ModelProduto } from 'src/app/classes/model.produto';

import { ProdutoService } from '../../../services/produto/produto.service';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  dadosParsis: any;
  dadosProduto: ModelProduto;
  codpro: string;

  constructor(private router: Router,
    private produtoService: ProdutoService) {

    //  this.dadosParsis = JSON.parse(
    //    this.activeRoute.snapshot.paramMap.get("dadosParsis"));

  }

  ngOnInit() {

    // this.dadosProduto = JSON.parse(this.activeRoute.snapshot.paramMap.get("dadosProduto"));
    // console.log(this.dadosProduto);
    //this.codpro = JSON.parse(this.activeRoute.snapshot.paramMap.get('produto_codpro'));
    this.dadosProduto = this.router.getCurrentNavigation().extras.state.produto_codpro;

    console.log('codigo produto ', this.codpro);



  }


  ionViewWillEnter() {
    this.findById();
  }

  async findById() {
    const data = await this.produtoService.findById(this.codpro);
    this.dadosProduto = data['data'];
  }

  showFormulario(dadosProduto: any) {
    this.router.navigateByUrl('/pedido-item', { state: { dadosProduto: dadosProduto } });
    // this.router.navigate(['pedido-item',
    //   JSON.stringify(dadosProduto)]);
  }

}
