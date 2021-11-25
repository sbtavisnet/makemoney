import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: "root"
})

export class CepService {

  constructor(public http: HttpClient) { }


  async getCep(cep: string) {
    const uri = `https://viacep.com.br/ws/${cep}/json/`;
    return await this.http.get(uri).toPromise();
  }

}
