import { Injectable } from "@angular/core";
import { DatePipe } from "@angular/common";

import {
  ToastController,
  LoadingController,
  AlertController
} from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  constructor(
    private datePipe: DatePipe,
    private toast: ToastController,
    public loadingCtrl: LoadingController,
    public alertController: AlertController
  ) {}

  async menssagem(menssagem: string, duracao = 1000) {
    const toast = await this.toast.create({
      message: menssagem,
      duration: duracao,
      position: "bottom"
    });
    toast.present();
  }

  async showLoading(AContext: any = "Aguarde ...", duracao = 1000) {
    const loading = await this.loadingCtrl.create({
      message: AContext,
      duration: duracao
    });

    return await loading.present();
  }

  async Confirma(mensagem: string) {
    return new Promise(async resolve => {
      const confirm = await this.alertController.create({
        header: "Confirma",
        message: mensagem,
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              return resolve(false);
            }
          },
          {
            text: "OK",
            handler: () => {
              return resolve(true);
            }
          }
        ]
      });

      await confirm.present();
    });
  }

  somenteNumero(value: string) {
    return value.replace(/\D/g, "");
  }
}
