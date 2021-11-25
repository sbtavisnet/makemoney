import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModelProduto } from '../../../classes/model.produto';
import { CartService } from '../../../services/card/cart.service';
import { ProdutoService } from '../../../services/produto/produto.service';

@Component({
    selector: 'page-produto-detail',
    templateUrl: 'produto-detail.html',
    styleUrls: ['produto-detail.scss'],
})


export class ProdutoDetailPage implements OnInit {

    modelProduto: ModelProduto;
    produto_codpro = '';

    constructor(
        private router: Router,
        public produtoService: ProdutoService,
        public cartService: CartService
    ) {
        //this.produto_codpro = this.activeRoute.snapshot.paramMap.get('produto_codpro');
        this.produto_codpro = this.router.getCurrentNavigation().extras.state.produto_codpro;
        this.modelProduto = new ModelProduto();
    }

    ngOnInit() {
        this.findById();
    }

    ionViewWillEnter() {
    }

    async findById() {
        const data = await this.produtoService.findById(this.produto_codpro);
        this.modelProduto = data['data'];
    }


    // getImageUrlIfExists() {
    //   this.produtoProvider.getImageFromBucket(this.item.id).subscribe(response => {
    //     this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${
    //       this.item.id
    //     }.jpg`;
    //   },error => {});
    // }

    addToCart(produto: ModelProduto) {

        this.router.navigate(['/pedido', JSON.stringify(this.modelProduto['data'])])

    }

}