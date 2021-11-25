
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from '../../config/api.config';
import { HEADER } from '../../config/header-const';



@Injectable({
    providedIn: "root"
})

export class GrupoService {

    private url: string;
    httpOptions: any;


    constructor(public http: HttpClient) {
        this.url = API_CONFIG.baseUrl;
        this.httpOptions = HEADER.headers;
    }


    getGrupos() {
        const uri = this.url + 'grupos';
        return this.http.get(uri, this.httpOptions);
    }

    getSubGrupos(grupo: string) {
        const uri = this.url + 'grupos/subgrupo/' + grupo;
        return this.http.get(uri, this.httpOptions);
    }

}