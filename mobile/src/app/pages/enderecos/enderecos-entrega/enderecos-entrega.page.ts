import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModelCliente } from 'src/app/classes/model.cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ModelCep } from 'src/app/classes/model.cep';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';
import { CepService } from 'src/app/services/cep/cep.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { UserStorageService } from 'src/app/services/data-storage/user-storage-service';
import { ClienteStorageService } from 'src/app/services/data-storage/cliente-storage-service';



@Component({
  selector: 'app-enderecos-entrega',
  templateUrl: './enderecos-entrega.page.html',
  styleUrls: ['./enderecos-entrega.page.scss'],
})
export class EnderecosEntregaPage implements OnInit {

  modelCliente: ModelCliente = new ModelCliente();
  codcli: string;
  produtosNoCarrinho: any;

  frmEndereco: FormGroup;

  modelCep = new ModelCep();

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dataStorageService: UserStorageService,
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private cepService: CepService,
    private utilsService: UtilsService,
    private clienteStorageService: ClienteStorageService


  ) {
    this.produtosNoCarrinho = JSON.parse(
      this.activeRoute.snapshot.paramMap.get('produtosNoCarrinho')
    );
    this.showEndereco();

  }

  ngOnInit() {
    this.getDados();

  }

  async getDados() {


    await this.dataStorageService.getConfiguracao()
      .then(res => {
        this.codcli = res['codcli'];
      })

    // dados do cliente 
    let dados = await this.clienteService.getClienteCodigo(this.codcli);
    this.modelCliente = dados['data'];

    // produto do carrinho
    this.produtosNoCarrinho = await this.pedidoService.getCart();

    this.showEndereco();


  }



  private showEndereco() {

    this.frmEndereco = this.formBuilder.group({
      cep: [this.modelCliente.cepcli, Validators.compose([Validators.required, Validators.maxLength(9)])],
      endereco: [this.modelCliente.endcli, Validators.compose([Validators.required])],
      numero: [this.modelCliente.numendcli, Validators.compose([Validators.required])],
      complemento: [this.modelCliente.complemento],
      bairro: [this.modelCliente.baiendcli, Validators.compose([Validators.required])],
      cidade: [this.modelCliente.cidcli, Validators.compose([Validators.required])],
      uf: [this.modelCliente.ufcli, Validators.compose([Validators.required])],
      celular: [this.modelCliente.celular, Validators.compose([Validators.required])],
    });
  }



  showPedidoFinalizar() {

    // salvando no storage de cliente
    this.clienteStorageService.save(this.modelCliente);

    this.router.navigate(['pedido-finalizar',
      JSON.stringify(this.produtosNoCarrinho)]);
  }



  async getCep(cep: string) {
    cep = this.utilsService.somenteNumero(cep);

    if (cep === undefined) {
      this.utilsService.menssagem('Favor informar o cep !');
      return null;
    }
    if (cep.length < 8) {
      this.utilsService.menssagem('Cep incorreto !');
      return null;
    }

    await this.cepService.getCep(cep)
      .then((data: any) => {
        if (data) {
          if (data.erro) {
            this.utilsService.menssagem('Cep não encontrado !');
            return null;
          }
          this.modelCep = data;
          this.modelCliente.endcli = this.modelCep.logradouro;
          this.modelCliente.endclient = this.modelCep.logradouro;
          this.modelCliente.baiendcli = this.modelCep.bairro;
          this.modelCliente.baiendclient = this.modelCep.bairro;
          this.modelCliente.complemento = this.modelCep.complemento;
          this.modelCliente.compleentrega = this.modelCep.complemento;
          this.modelCliente.cidcli = this.modelCep.localidade;
          this.modelCliente.cidclient = this.modelCep.localidade;
          this.modelCliente.cepcli = cep;
          this.modelCliente.cepclient = cep;
          this.modelCliente.ufcli = this.modelCep.uf;
          this.modelCliente.ufclient = this.modelCep.uf;

          this.showEndereco();

        }
      });
  }




}
