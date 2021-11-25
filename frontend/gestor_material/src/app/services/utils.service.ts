import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: "root"
})
export class UtilsService {
  constructor(private snackBar: MatSnackBar) { }


  somenteNumero(value?: string) {
    return value?.replace(/\D/g, '');
  }


  showMessage(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ["msg-success"],
      //panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  showError(error: any) {
    if (error === 500) {
      return this.errorJSON(false, 'Error 500');
    }
    else if (error === 400) {
      return this.errorJSON(false, 'Error 400');
    }
  }

  private errorJSON(success: boolean, mensagem: string) {
    const erro = { 'success': success, 'mensagem': mensagem }
    return erro;
  }


  // async menssagem(menssagem: string, duracao = 1000) {
  //   const toast = await this.toast.create({
  //     message: menssagem,
  //     duration: duracao,
  //     position: "bottom"
  //   });
  //   toast.present();
  // }

  // async showLoading(AContext: any = "Aguarde ...", duracao = 1000) {
  //   const loading = await this.loadingCtrl.create({
  //     message: AContext,
  //     duration: duracao
  //   });

  //   return await loading.present();
  // }

  // async Confirma(mensagem: string) {
  //   return new Promise(async resolve => {
  //     const confirm = await this.alertController.create({
  //       header: "Confirma",
  //       message: mensagem,
  //       buttons: [
  //         {
  //           text: "Cancel",
  //           role: "cancel",
  //           handler: () => {
  //             return resolve(false);
  //           }
  //         },
  //         {
  //           text: "OK",
  //           handler: () => {
  //             return resolve(true);
  //           }
  //         }
  //       ]
  //     });

  //     await confirm.present();
  //   });
  // }


}
