import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ConfigUris } from "../config/api.config";
import { ModelUsuario } from "../models/model.usuario";

@Injectable({
  providedIn: "root"
})
export class ILuteroService {
  public uri: string;

  private configUris: ConfigUris = new ConfigUris();

  constructor(public http: HttpClient) { }


  async getUsuario(email, senha: string): Promise<any> {
    const uriprivate = this.configUris.uriUsuario(email, senha);

    const dados = await this.http.get(uriprivate).toPromise();
    return dados;
  }
}
