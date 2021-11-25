import { Injectable } from '@angular/core';

import { ToastController, LoadingController } from '@ionic/angular';

import { API_CONFIG } from 'src/app/config/api.config';

@Injectable({
    providedIn: "root"
})

export class UtilsService {

    subgrupo: any;

    constructor(
        private toast: ToastController,
        public loadingCtrl: LoadingController) {

    }

    async menssagem(menssagem: string) {
        const toast = await this.toast.create({
            message: menssagem,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }


    public dataHoje(asplit = '-') {
        const data = new Date();
        const dia = this.zeroLeft(data.getDate().toString(), 2);
        const mes = this.zeroLeft((data.getMonth() + 1).toString(), 2);
        const ano = data.getFullYear();
        return [ano, mes, dia].join(asplit);
    }

    public toDate(dateStr, asplit = '-') {
        dateStr = dateStr.substring(0, 10);
        const parts = dateStr.split(asplit);
        const dia = this.zeroLeft(parts[0], 2);
        const mes = this.zeroLeft((parts[1] - 1).toString(), 2);
        const ano = parts[2];
        return `${dia}${asplit}${mes}${asplit}${ano}`;
    }

    public getDate(dateStr) {
        dateStr = dateStr.substring(0, 10);
        return dateStr;
    }



    async showLoading(AContext: any = 'Aguarde ...', duration = 1000) {
        const loading = await this.loadingCtrl.create({
            message: AContext,
            duration: duration
        });
        return await loading.present();
    }

    somenteNumero(value: string) {
        return value.replace(/\D/g, "");

    }

    pathImage(image) {
        if (API_CONFIG.baseUrlIMG.length > 0) {
            return API_CONFIG.baseUrlIMG + image + '.jpg';
        }
        return null;
    }


    zeroLeft(value: string, tamanho: number) {
        return value.padStart(tamanho, '0');

    }

    spaceRigth(value: string, tamanho: number) {
        let result = value;
        for (let i = 0; i <= tamanho; i++) {
            result += ' ';
        }
        return result;
    }

    firstName(value: string) {
        const dados = value.split(' ').slice(0, 1);
        return dados[0];
    }


}