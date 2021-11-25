import {
    Component,
    OnInit
} from '@angular/core';

import { ToastController } from '@ionic/angular';

import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UserStorageService } from 'src/app/services/data-storage/user-storage-service';
import { UtilsService } from 'src/app/services/utils/utils.service';


@Component({
    selector: 'page-titulos',
    templateUrl: 'titulos.html',
    styleUrls: ['titulos.scss'],
})


export class TitulosPage implements OnInit {

    listaTitulos = null;

    public titulosQte = 0;
    public titulosValor = 0;
    public titulosEmAtraso = 0;

    private dia: any;

    constructor(
        public utils: UtilsService,
        private storage: UserStorageService,
        private clienteService: ClienteService) {

        this.dia = this.utils.dataHoje();
    }

    ngOnInit() { }

    ionViewWillEnter() {
        const loading = this.utils.showLoading();
        this.storage.getConfiguracao()
            .then(() => {
                this.clienteService.getClienteTitulos(this.storage.modelUser.codcli)
                    .subscribe(data => {
                        if (data) {
                            this.listaTitulos = data['data'];
                            this.somaValores();
                        } else {
                            this.listaTitulos = null
                        };
                    })
            })
    };


    somaValores() {

        this.titulosQte = 0;
        this.titulosValor = 0;
        this.titulosEmAtraso = 0;

        let total = 0;
        let diaVencimento = null;

        if (this.listaTitulos != null && this.listaTitulos.length > 0) {

            for (let i = 0; i < this.listaTitulos.length; i++) {
                this.titulosQte = i;
                total = total + parseFloat(this.listaTitulos[i]?.valor);
                diaVencimento = this.listaTitulos[i]?.vencimento;

                // titulos em atraso
                if (this.utils.toDate(diaVencimento) < this.utils.toDate(this.dia)) {
                    this.titulosEmAtraso = this.titulosEmAtraso + parseFloat(this.listaTitulos[i]?.valor);
                }

            }
            this.titulosQte = this.titulosQte + 1;

            this.titulosValor = total;

        }


    }

    isVencido(datvenc: any) {
        let result = false;
        if (this.utils.toDate(datvenc) < this.utils.toDate(this.dia)) {
            result = true;
        }
        return result;
    }



    copiaLinhaDigitavel(value: any) {
        navigator.clipboard.writeText(this.utils.somenteNumero(value));
        this.utils.showLoading('Código copiado ...', 500);

    }


    async boletoPorEmail(codemp, iddocumento) {

        this.utils.menssagem('Aguarde !!!')
        this.clienteService.boletoPorEmail(codemp, iddocumento)
            .then((res) => {
                if (res['success'])
                    this.utils.menssagem('E-mail enviado com sucesso !!!')
                else this.utils.menssagem('Favor entrar em  contato com nosso canais de atendimento !!!');
            });

    }



}