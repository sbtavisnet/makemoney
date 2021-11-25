import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_CONFIG } from '../config/const.config';
import { ModelParsis } from '../models/model.parsis';

@Injectable({
  providedIn: 'root'
})

export class ParsisRepository {
  private Uri = 'parsis/';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient) { }


  async getAll() {
    const uriprivate = API_CONFIG.baseUrl + this.Uri;

    const dados = await this.http.get(uriprivate).toPromise();
    return dados;
  }

  save = async (model: ModelParsis) => {
    if (model.id > 0) {
      const dados = await this.update(model);
      return dados;
    } else {
      const dados = await this.insert(model);
      return dados;
    }

  }

  async deleteRegistro(id: number) {
    return new Promise(async resolve => {
      const uriprivate = API_CONFIG.baseUrl + this.Uri + id;
      this.http.delete(uriprivate, this.httpOptions).subscribe(res => {
        return resolve(res);
      }),
        error => {
          console.log(error);
          return resolve(error);
        };
    });
  }

  private async insert(model: ModelParsis) {
    const uriprivate = API_CONFIG.baseUrl + this.Uri;
    const obj: string = JSON.stringify(model);
    const postData = obj; // encode a string
    this.http.post(uriprivate, postData, this.httpOptions).subscribe(res => {
      console.log(res);
    }),
      error => {
        console.log(error);
      };
  }

  private update = async (model: ModelParsis) => {
    const uriprivate = API_CONFIG.baseUrl + this.Uri + model.id;
    const obj: string = JSON.stringify(model);
    const postData = obj;
    const dados = await this.http
      .put(uriprivate, postData, this.httpOptions)
      .toPromise();
    return dados;
  }

}
