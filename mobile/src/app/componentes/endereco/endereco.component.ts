import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ModelCep } from 'src/app/classes/model.cep';
import { ModelCliente } from 'src/app/classes/model.cliente';
import { CepService } from 'src/app/services/cep/cep.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { UserStorageService } from 'src/app/services/data-storage/user-storage-service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
})
export class EnderecoComponent implements OnInit {

  modelCep = new ModelCep();
  modelCliente: ModelCliente = new ModelCliente();

  inputReadOnly = true;

  constructor(private router: Router,
    private utilsService: UtilsService,
    private storage: UserStorageService,
    private cepService: CepService,
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {

    this.storage.getConfiguracao()
      .then(res => {
        let codcli = res['codcli'];
        this.clienteService.getClienteCodigo(codcli)
          .then(res => {
            if (Object.keys(res).length > 0) {
              this.modelCliente = res['data']
            }

          })

      })

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
        }
      });
  }

  saveEndereco(modelCliente: ModelCliente) {
    this.clienteService.saveCliente(modelCliente)
      .then(res => {
        if (Object.keys(res).length === 0) {
          this.utilsService.menssagem('Não foi possivel gravar os dados !');
          return;
        }
        if (!res['success']) {
          this.utilsService.menssagem('Não foi possivel gravar os dados !');
          return;
        }
        this.utilsService.menssagem('Dados gravado com sucesso !');

        this.router.navigateByUrl('/home');


      })



  }


  voltar() {
    this.router.navigateByUrl('/home');
  }

}
