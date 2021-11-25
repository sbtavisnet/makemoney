import {
    Component,
    OnInit
} from '@angular/core';
import {
    Router
} from '@angular/router';

import { UserStorageService } from 'src/app/services/data-storage/user-storage-service';
import { MinhaCompraService } from 'src/app/services/minhas-compras/minha-compra.services';
import {
    UtilsService
} from 'src/app/services/utils/utils.service';





@Component({
    selector: 'page-minha-compra',
    templateUrl: 'minha-compra.html',
    styleUrls: ['minha-compra.scss'],
})

export class MinhaCompraPage implements OnInit {

    public dadosPedido: any;
    public dadosPedidoItens: any;

    constructor(
        private router: Router,
        private utils: UtilsService,
        public minhaCompraService: MinhaCompraService,
        public storage: UserStorageService) { }

    ngOnInit() { }



    ionViewDidEnter() {
        this.storage.getConfiguracao()
            .then(() => {
                this.minhaCompraService.getClientePedidos(this.storage.modelUser.codcli)
                    .subscribe(data => {
                        if (data['success']) {
                            this.dadosPedido = data['data'];
                        } else {
                            this.dadosPedido = null;
                        }
                    }, error => {
                        console.log(error);

                    })
            })

    }


    public getPedidoItens(id: number) {
        const loading = this.utils.showLoading();
        this.minhaCompraService.getPedidoItens(id)
            .subscribe(data => {
                if (data['success'] != null) {
                    this.dadosPedidoItens = data['data'];
                    this.router.navigate(['/minha-compra-itens', JSON.stringify(this.dadosPedidoItens)]);
                } else {
                    this.dadosPedidoItens = null;
                }
            }, error => {
                console.log(error);
            })
    }



}