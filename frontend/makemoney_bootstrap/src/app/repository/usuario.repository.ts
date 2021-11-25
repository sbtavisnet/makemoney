import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { ConfigUris } from "../config/api.config";
import { API_CONFIG } from "../config/const.config";
import { ModelUsuario } from "../models/model.usuario";

@Injectable({
  providedIn: "root"
})
export class UsuarioRepository {
  private configUris: ConfigUris = new ConfigUris();
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(public http: HttpClient) {}

  // dadosUsuario(res?: any): ModelUsuario {
  //   return res;
  // }

  async getUsuario(email, senha) {
    const uriprivate = API_CONFIG.baseUrl + "usuarios/" + email + "/" + senha;
    const dados = await this.http.get(uriprivate).toPromise();
    return dados;
  }

  save = async (model: ModelUsuario) => {
    const dados = await this.update(model);
    return dados;
  };

  async deleteRegistro(id: number) {
    return new Promise(async resolve => {
      const uriprivate = API_CONFIG.baseUrl + "usuarios/" + id;
      this.http.delete(uriprivate, this.httpOptions).subscribe(res => {
        return resolve(true);
      }),
        error => {
          console.log(error);
          return resolve(false);
        };
    });
  }

  private async insert(model: ModelUsuario) {
    const uriprivate = API_CONFIG.baseUrl + "usuarios";
    const obj: string = JSON.stringify(model);
    const postData = obj; // encode a string
    this.http.post(uriprivate, postData, this.httpOptions).subscribe(res => {
      console.log(res);
    }),
      error => {
        console.log(error);
      };
  }

  update = async (model: ModelUsuario) => {
    const uriprivate = API_CONFIG.baseUrl + "usuarios";
    const obj: string = JSON.stringify(model);
    const postData = obj;
    const dados = await this.http
      .put(uriprivate, postData, this.httpOptions)
      .toPromise();
    return dados;
  };

  async recuperarSenha(email) {
    const uriprivate = API_CONFIG.baseUrl + "email/email=" + email;
    console.log("recuperar senha ", uriprivate);

    const dados = await this.http.get(uriprivate).toPromise();
    return dados;
  }
}
