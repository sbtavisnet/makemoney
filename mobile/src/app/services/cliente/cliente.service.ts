import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_CONFIG } from 'src/app/config/api.config';
import { ModelCliente } from 'src/app/classes/model.cliente';
import { HEADER } from 'src/app/config/header-const';

import { firstValueFrom } from 'rxjs';



@Injectable({
    providedIn: 'root'
})

export class ClienteService {

    codcli: string;
    nomecliente: string;

    private uri: string;
    httpOptions: any;


    data: any

    constructor(public http: HttpClient) {
        this.uri = API_CONFIG.baseUrl;
        this.httpOptions = HEADER.headers;
    }


    async getClienteCodigo(codigo: string) {
        const auri = this.uri + 'clientes/' + codigo;
        return await firstValueFrom(this.http.get<ModelCliente>(auri, this.httpOptions));
    }


    getClienteCNPJ(cnpj_cpf: string) {
        const uricnpj_cpf =
            this.uri + 'clientes/cnpj/senha/' + cnpj_cpf;
        return this.http.get(uricnpj_cpf, this.httpOptions);

    }

    async cliente_Login_CNPJ(cnpj_cpf: string, psw: string) {
        let uricnpj_cpf =
            this.uri +
            'clientes/login/' + cnpj_cpf;

        const model = {
            "psw": psw
        };

        const headers = new HttpHeaders();
        headers.append('content-Type', 'application/json; charset=UTF-8');
        return await firstValueFrom(this.http.post(uricnpj_cpf, model, { headers }));

    };



    recuperarSenhaCNPJ(cnpj: string) {
        let uricnpj_cpf = this.uri +
            'clientes/recuperarsenha/' + cnpj;
        console.log(`recuperar senha`, uricnpj_cpf);

        return this.http.get(uricnpj_cpf, this.httpOptions);

    }

    // savePsw(cnpj: string, PSW: string) {
    //     const uriprivate = this.uri + 'cliente_cadastrar_senha';
    //     const data = {
    //         cnpjcpf: cnpj,
    //         psw: PSW
    //     };

    //     const obj = JSON.stringify(data);
    //     const encodedData = window.btoa(obj); // encode a string
    //     const dados = uriprivate + '?data=' + encodedData;

    //     const headers = new HttpHeaders();
    //     headers.append("Content-Type", "application/x-www-form-urlencoded");

    //     return this.http.post(dados, null, {
    //         headers
    //     });
    // }

    getClienteTitulos(codcli: string) {
        const uriprivate = this.uri + 'clientes/titulos/' + codcli
        return this.http.get(uriprivate, this.httpOptions);
    }



    dadosDoCliente(model: ModelCliente, res: any) {
        if (res != null) {
            model.nomcli = res['nomcli'];

            model.endcli = res['endcli'];
            model.numendcli = res['numendcli'];
            model.complemento = res['complemento'];
            model.baiendcli = res['baiendcli'];
            model.cidcli = res['cidcli'];
            model.ufcli = res['ufcli'];
            model.cepcli = res['cepcli'];

            model.endclient = res['endclient'];
            model.numendclient = res['numendclient'];
            model.compleentrega = res['compleentrega'];
            model.baiendclient = res['baiendclient'];
            model.cidclient = res['cidclient'];
            model.ufclient = res['ufclient'];
            model.cepclient = res['cepclient'];
            model.mailcli = res['mailcli'];

            model.celular = res['celular'];
            model.cgccpfcli = res['cgccpfcli'];
        }

    }


    async saveCliente(model: ModelCliente,) {
        const uriprivate = this.uri + 'clientes/' + model.codcli;

        const headers = new HttpHeaders();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        return await firstValueFrom(this.http.post(uriprivate, model, { headers }));

    }



    async AlterarSenha(cnpjcpf: string, model: any) {
        const uriprivate = this.uri + 'clientes/alterarsenha/' + cnpjcpf;
        const obj = model;
        const headers = new HttpHeaders();
        headers.append('content-Type', 'application/json; charset=UTF-8');
        return await firstValueFrom(this.http.post(uriprivate, obj, { headers }));

    }


    boletoPorEmail(codemp, iddocumento: string) {
        const uriprivate =
            this.uri + 'boletos/email/' + codemp + '/' + iddocumento
        return firstValueFrom(this.http.get(uriprivate, this.httpOptions));

    }



}
