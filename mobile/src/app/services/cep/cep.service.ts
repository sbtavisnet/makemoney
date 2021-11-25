import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class CepService {


  constructor(public http: HttpClient) { }


  async getCep(cep: string) {
    const uri = `https://viacep.com.br/ws/${cep}/json/`;
    return await firstValueFrom(this.http.get(uri));
  }

}
