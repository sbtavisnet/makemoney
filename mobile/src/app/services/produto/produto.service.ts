import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HEADER } from 'src/app/config/header-const';

import { firstValueFrom } from 'rxjs';

import { ModelProduto } from '../../classes/model.produto';
import { API_CONFIG } from '../../config/api.config';



@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  private url: string;
  httpOptions: any;

  constructor(public http: HttpClient) {
    this.httpOptions = HEADER.headers
    this.url = API_CONFIG.baseUrl;
  }


  getProdutosSubGrupos(grupo, subrupo, despro: string, page: number) {
    let uri = this.url + 'produtos/grupo/subgrupo/' +
      grupo + '/' + subrupo + '/' + despro + '/' + page;
    if (despro == '')
      uri = this.url + 'produtos/grupo/subgrupo/' +
        grupo + '/' + subrupo + '/' + page;


    return this.http.get(uri, this.httpOptions);

  }


  getProdutos(despro: string, page: number = 0) {
    const uri = this.url + `produtos/descricao/${despro}/${page}`;

    return this.http.get(uri, this.httpOptions);

  }

  async findById(codpro: string) {
    const uri = this.url + `produtos/${codpro}`;

    return await firstValueFrom(this.http.get(uri, this.httpOptions));
    //return await firstValueFrom(this.http.get<ModelProduto>(uri, this.httpOptions));

  }

  // const uri = this.url + 'grupos/subgrupo/' + grupo;
  //       return this.http.get(uri, this.httpOptions);

}
