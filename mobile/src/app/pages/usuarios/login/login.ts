import { Component, Output } from '@angular/core';
import {
    FormGroup,
    Validators,
    FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { ModelCep } from 'src/app/classes/model.cep';
import { ModelCliente } from 'src/app/classes/model.cliente';
import { ModelUser } from 'src/app/classes/model.user';
import { CepService } from 'src/app/services/cep/cep.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UserStorageService } from 'src/app/services/data-storage/user-storage-service';
import { UtilsService } from 'src/app/services/utils/utils.service';



@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    styleUrls: ['login.scss'],
})
export class LoginPage {


    @Output() nomedocliente: string;


    logar = true;
    registrar = false;
    senha: string;
    senha1: string;

    frmLogin: FormGroup;
    frmLoginCadastro: FormGroup;

    modelUser: ModelUser;
    modelCliente = new ModelCliente();
    modelCep = new ModelCep();

    constructor(
        private router: Router,
        public alertCtrl: AlertController,
        private utilsService: UtilsService,
        private formBuilder: FormBuilder,
        private storage: UserStorageService,
        private cepService: CepService,
        private clienteService: ClienteService) {

        this.isValidaLogin();
        this.isValidaCadastro();

    }


    async login() {
        let cnpjcpf = this.frmLogin.get('cnpjcpf').value;
        this.senha = this.frmLogin.get('senha').value;
        let res = await this.clienteService.cliente_Login_CNPJ(cnpjcpf, this.senha);

        this.modelUser = null;
        this.modelCliente = null;

        if (res['success']) {

            this.modelUser = res['data'];

            let flag = true;
            this.clienteService.codcli = res['codcli'];
            this.nomedocliente = res['nomcli'];
            this.clienteService.nomecliente = res['nomcli'];
            if (flag) {
                this.storage.isClientConnected = true;
                this.modelUser.isClientConnected = true;
                this.storage.insert(this.modelUser);
                this.router.navigateByUrl('/home');
            }

            return flag;

        } else {
            this.utilsService.menssagem('Você não é cadastrado, ou sua senha não confere !');
            return false;
        };

    };



    private isValidaLogin() {

        this.frmLogin = this.formBuilder.group({
            cnpjcpf: ['', Validators.compose([Validators.required,
            Validators.minLength(11),
            Validators.maxLength(14)
            ])],
            senha: ['', Validators.compose([Validators.required,
            Validators.maxLength(6),
            Validators.minLength(6)
            ])]

        });

    }

    private isValidaCadastro() {

        this.frmLoginCadastro = this.formBuilder.group({
            // nome: ['', Validators.compose([Validators.required])],
            // endereco: ['', Validators.compose([Validators.required])],
            // numero: ['', Validators.compose([Validators.required])],
            // complemento: '',
            // bairro: ['', Validators.compose([Validators.required])],
            // cidade: ['', Validators.compose([Validators.required])],
            // uf: ['', Validators.compose([Validators.required])],
            // cep: ['', Validators.compose([Validators.required])],
            // celular: ['', Validators.compose([Validators.required])],
            // email: ['', Validators.compose([Validators.required])],

            cnpjcpf: ['', Validators.compose([Validators.required,
            Validators.minLength(11),
            Validators.maxLength(14)
            ])],

            senha: ['', Validators.compose([Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6)
            ])],
            senha1: ['', Validators.compose([Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6)
            ])],
        });

    }

    //Exibir form de registro
    exibirRegistrar() {
        this.logar = false;
        this.registrar = true;
        this.isValidaCadastro();

    }

    //Exibir form de login
    exibirLogin() {
        this.logar = true;
        this.registrar = false;
        this.isValidaLogin();
    }


    async esqueceuSenha() {
        const alert = await this.alertCtrl.create({
            header: 'Esqueceu a Senha ?',
            message: 'Digite o seu CPF/CNPJ que enviaremos a sua senha.',
            inputs: [{
                name: 'cnpj',
                placeholder: 'CNPJ/CPF',
                type: 'text'
            },],
            buttons: [{
                text: 'Cancel',
                handler: data => {
                    console.log('Cancelado');
                }
            },
            {
                text: 'Enviar',
                handler: data => {
                    this.clienteService.recuperarSenhaCNPJ(data.cnpj)
                        .subscribe((res) => {
                            if (res['success'] == true) {
                                this.utilsService.menssagem('E-mail enviado com sucesso !');
                            }
                        });
                }
            }
            ]
        });
        return await alert.present();
    }


    // async savePsw() {

    //     this.modelCliente.cgccpfcli = this.frmLoginCadastro.get('cgccpf').value;
    //     const senha = this.frmLoginCadastro.get('senha').value;

    //     let res = await this.clienteService.cliente_Login_CNPJ(this.modelCliente.cgccpfcli, senha);
    //     if (res == null || res == undefined) {
    //         return false;
    //     }

    //     this.clienteService.savePsw(
    //         this.modelCliente.cgccpfcli,
    //         this.modelCliente.psw)
    //         .subscribe(data => {
    //             this.storage.getConfiguracao()
    //                 .then(() => {
    //                     this.utilsService.menssagem('Senha criado com sucesso !!!');

    //                     this.exibirLogin();
    //                 });
    //         });


    // }


    async cadastrarCliente() {
        // armazena os dados do cliente
        await this.dadosCliente();

        if (this.senha !== this.senha1) {
            this.utilsService.menssagem('Senha não confere.');
            return false;

        }

        await this.clienteService.getClienteCNPJ(this.modelCliente.cgccpfcli)
            .subscribe((res) => {
                if (Object.keys(res).length > 0) {
                    this.utilsService.menssagem('Você já é cadastrado, use a opção esqueceu a senha.');
                    return false;
                }
            });


        let result = this.clienteService.saveCliente(this.modelCliente);
        result
            .then(res => {
                if (res['codigo'] === '201') {
                    this.utilsService.menssagem('Dados cadastrado com sucesso !!!');
                    this.exibirLogin();
                    //this.limparDados();
                    return;
                }
                if (res['codigo'] === '422') {
                    console.log();
                    this.utilsService.menssagem('Erro tente novamente !!!' + result);
                    return;
                }
            })


    }



    async cadastrarSenha() {

        if (this.frmLoginCadastro.get('senha').value !== this.frmLoginCadastro.get('senha1').value) {
            this.utilsService.menssagem('Senha não confere.');
            return false;
        }
        this.modelCliente = null;
        const cnpjcpf = this.frmLoginCadastro.get('cnpjcpf').value;


        await this.clienteService.getClienteCNPJ(cnpjcpf)
            .subscribe((res) => {
                this.modelCliente = res['data'];
                if (res['success'] == false) {
                    this.utilsService.menssagem('Você já é cadastrado, use a opção esqueceu a senha.');
                    return false;
                }
                let model = {
                    "psw": this.frmLoginCadastro.get('senha').value
                }
                let result = this.clienteService.AlterarSenha(cnpjcpf, model);
                result
                    .then(res => {
                        if (res['success'] === true) {
                            this.utilsService.menssagem('Dados cadastrado com sucesso !!!');
                            this.exibirLogin();
                            return;
                        }
                        if (res['success'] == false) {
                            console.log();
                            this.utilsService.menssagem('Erro tente novamente !!!' + result);
                            return;
                        }
                    })

            });




    }



    async getCep() {
        let cep = this.frmLoginCadastro.get('cep').value;
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
                    this.frmLoginCadastro.get('endereco').setValue(this.modelCep.logradouro);
                    this.frmLoginCadastro.get('complemento').setValue(this.modelCep.complemento);
                    this.frmLoginCadastro.get('bairro').setValue(this.modelCep.bairro);
                    this.frmLoginCadastro.get('cidade').setValue(this.modelCep.localidade);
                    this.frmLoginCadastro.get('cep').setValue(cep);
                    this.frmLoginCadastro.get('uf').setValue(this.modelCep.uf);

                }
            });
    }



    async dadosCliente() {
        this.modelCliente.nomcli = this.frmLoginCadastro.get('nome').value;
        this.modelCliente.endcli = this.frmLoginCadastro.get('endereco').value;
        this.modelCliente.numendcli = this.frmLoginCadastro.get('numero').value;
        this.modelCliente.complemento = this.frmLoginCadastro.get('complemento').value;;
        this.modelCliente.baiendcli = this.frmLoginCadastro.get('bairro').value;
        this.modelCliente.cidcli = this.frmLoginCadastro.get('cidade').value;;
        this.modelCliente.ufcli = this.frmLoginCadastro.get('uf').value;;
        this.modelCliente.cepcli = this.frmLoginCadastro.get('cep').value;;
        this.modelCliente.celular = this.frmLoginCadastro.get('celular').value;;
        this.modelCliente.mailcli = this.frmLoginCadastro.get('email').value;;
        this.modelCliente.cgccpfcli = this.frmLoginCadastro.get('cnpjcpf').value;
        this.modelCliente.psw = this.frmLoginCadastro.get('senha').value;

        this.senha = this.frmLoginCadastro.get('senha').value;
        this.senha1 = this.frmLoginCadastro.get('senha1').value;

        return await this.modelCep;

    };



}