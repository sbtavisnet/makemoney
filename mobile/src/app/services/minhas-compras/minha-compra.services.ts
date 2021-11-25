import {
    HttpClient
} from '@angular/common/http';
import {
    Injectable
} from '@angular/core';

import { HEADER } from 'src/app/config/header-const';

import {
    UtilsService
} from '../utils/utils.service';
import {
    API_CONFIG
} from '../../config/api.config';



@Injectable({
    providedIn: "root"
})

export class MinhaCompraService {

    private url: string;
    private uri: string;

    httpOptions: any;

    constructor(public http: HttpClient,
        public utilsService: UtilsService) {

        this.url = API_CONFIG.baseUrl;
        this.httpOptions = HEADER.headers;

    }


    public getClientePedidos(codcli: string) {
        this.uri = this.url + 'pedidos/' + codcli;
        return this.http.get(this.uri, this.httpOptions);

    }

    public getPedidoItens(id: number) {
        this.uri = this.url + 'pedidos/itens/' + id;
        return this.http.get(this.uri, this.httpOptions);
    }




}