import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { ModelUser } from 'src/app/classes/model.user';
import { CONST } from 'src/app/config/const';

import { UtilsService } from '../utils/utils.service';


@Injectable({
    providedIn: 'root'
})
export class UserStorageService {
    private key = CONST.MAKEMONEY_MOBIL_USER;

    modelUser: ModelUser;

    isClientConnected: boolean = false;


    constructor(public storage: Storage,
        private utilsService: UtilsService) {
        this.modelUser = new ModelUser();

        this.ngOnInit();

    }

    async ngOnInit() {
        await this.storage.create();
    }

    async load(): Promise<any> {
        return await this.storage.get(this.key);
    }

    public insert(modelUser: ModelUser) {
        return this.save(modelUser);
    }

    public remove() {
        return this.storage.remove(this.key);
    }

    public save(modelUser: ModelUser) {
        this.storage.set(this.key, modelUser);
    }

    public async getConfiguracao(): Promise<any> {
        return await this.load()
            .then((res) => {
                if (res) {
                    this.modelUser.codcli = res.codcli;
                    this.modelUser.nomcli = res.nomcli;
                    this.modelUser.cgccpfcli = res.cgccpfcli;
                    this.modelUser.psw = res?.psw;
                    this.isClientConnected = true;
                    if (this.modelUser?.codcli?.length === 0)
                        this.isClientConnected = false;
                    this.modelUser.isClientConnected = this.isClientConnected;
                    return this.modelUser;
                }
            })
            .catch(error => {
                this.modelUser.codcli = null;
                this.modelUser.nomcli = null;
                this.modelUser.cgccpfcli = null;
                this.modelUser.psw = null;
                this.isClientConnected = false;
                this.utilsService.menssagem(error);

                return this.modelUser;
            });
    }


}

