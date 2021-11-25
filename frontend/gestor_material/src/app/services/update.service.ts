import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";

import { ToastController } from "@ionic/angular";

import { interval } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UpdateService {
  constructor(public updates: SwUpdate, private toast: ToastController) {
    if (updates.isEnabled) {
      interval(6 * 60 * 60).subscribe(() =>
        updates.checkForUpdate().then(() => {
          //this.menssagem("Verificando atualizações!");
          console.log("Verificando atualizações!");
        })
      );
    }
  }

  public checkForUpdates(): void {
    this.updates.available.subscribe(event => this.promptUser());
  }

  private promptUser(): void {
    this.menssagem("Atualizando para a nova versão!");
    //console.log("Atualizando para a nova versão!");
    this.updates.activateUpdate().then(() => document.location.reload());
  }

  async menssagem(menssagem: string, duracao = 1000) {
    const toast = await this.toast.create({
      message: menssagem,
      duration: duracao,
      position: "bottom"
    });
    toast.present();
  }
}
