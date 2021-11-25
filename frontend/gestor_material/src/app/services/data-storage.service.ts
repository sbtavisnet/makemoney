import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Storage } from "@ionic/storage";

import { ModelUsuario } from "../models/model.usuario";

import { UtilsService } from "./UtilsService";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  private key = "gestor";

  modelUsuario = new ModelUsuario();

  constructor(
    public storage: Storage,
    private router: Router,
    private utilsService: UtilsService
  ) { }

  async load() {
    return this.storage.get(this.key);
  }

  async insert(modelUsuario: ModelUsuario) {
    return await this.save(modelUsuario);
  }

  remove() {
    return this.storage.remove(this.key);
  }

  save(modelUsuario: ModelUsuario) {
    return this.storage.set(this.key, modelUsuario);
  }

  async getConfiguracao() {
    return this.storage
      .get(this.key)
      .then(async res => {
        if (res !== null) {
          return await res;
        }
        return await null;
      })
      .catch(async error => {
        this.utilsService.menssagem(error);
        return await null;
      });
  }
}
