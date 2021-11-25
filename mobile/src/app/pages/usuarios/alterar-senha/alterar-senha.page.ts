import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModelUser } from 'src/app/classes/model.user';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UserStorageService } from 'src/app/services/data-storage/user-storage-service';
import { UtilsService } from 'src/app/services/utils/utils.service';


@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
})
export class AlterarSenhaPage implements OnInit {


  modelUser = new ModelUser();

  psw: string;
  psw1: string;


  constructor(private router: Router,
    private storage: UserStorageService,
    private utilService: UtilsService,
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.getConfiguracao();
  }

  getConfiguracao() {
    this.storage.getConfiguracao()
      .then(res => {
        this.modelUser = this.storage.modelUser;
      });

  }

  save(ev: any) {

    if (this.psw !== this.psw1) {
      this.utilService.menssagem('Senha não confere !!');
      return;
    }


    this.modelUser.psw = ev.psw;
    let model = {
      "psw": this.modelUser.psw
    }
    this.clienteService.AlterarSenha(this.modelUser.cgccpfcli, model)
      .then(res => {
        if (Object.keys(res).length == 0) {
          this.utilService.menssagem('Não foi possivel alterar a senha !!');
          return;
        }
        if (res['success']) {
          this.utilService.menssagem('Senha alterado com sucesso !!');
          //this.storage.save(this.modelUser);

          this.router.navigateByUrl('/login');

        }
      })

  }



}
