import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/const.config';
import { GrupoModel } from '../models/grupo.model';
import { UtilsService } from '../services/utils.service';



@Injectable({
  providedIn: 'root'
})

export class GrupoRepository {
  private Uri = 'grupos/';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient,
    private utilsService: UtilsService) { }


  async getAll() {
    const uriprivate = API_CONFIG.baseUrl + this.Uri;

    const dados = await this.http.get(uriprivate).toPromise();
    return dados;
  }

  async getById(id: number) {
    const uriprivate = API_CONFIG.baseUrl + this.Uri + id;

    const dados = await this.http.get(uriprivate).toPromise();
    return dados;

  }


  save = async (model: GrupoModel) => {
    if (model.id > 0) {
      const dados = await this.update(model);
      return dados;
    } else {
      const dados = await this.create(model);
      return dados;
    }

  }


  async delete(id: number) {
    return new Promise(async resolve => {
      const uriprivate = API_CONFIG.baseUrl + this.Uri + id;
      this.http.delete(uriprivate, this.httpOptions).subscribe(res => {
        return resolve(res);
      }),
        error => {
          return resolve(error);
        };
    });
  }


  // async insert(model: GrupoModel) {
  //   return new Promise(async resolve => {
  //     const uriprivate = API_CONFIG.baseUrl + this.Uri;
  //     const obj: string = JSON.stringify(model);
  //     const postData = obj; // encode a string

  //     this.http.post(uriprivate, postData, this.httpOptions).subscribe(res => {
  //       console.log('sbt', res);
  //       return resolve(res);
  //     }),
  //       error => {
  //         console.log('sbt', error);
  //         return resolve(error);
  //       };
  //   });
  // }


  private async create(model: GrupoModel) {
    const uriprivate = API_CONFIG.baseUrl + this.Uri;
    const obj: string = JSON.stringify(model);
    const postData = obj; // encode a string
    this.http.post(uriprivate, postData, this.httpOptions)
      .subscribe(res => {
        return res;
      },
        erro => {
          return this.utilsService.showError(erro.error.status);
        })

  }



  private update = async (model: GrupoModel) => {
    const uriprivate = API_CONFIG.baseUrl + this.Uri + model.id;
    const obj: string = JSON.stringify(model);
    const postData = obj;
    const dados = await this.http
      .put(uriprivate, postData, this.httpOptions)
      .toPromise();
    return dados;
  }

}
