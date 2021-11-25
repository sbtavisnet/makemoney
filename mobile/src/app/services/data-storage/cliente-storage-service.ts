import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { CONST } from 'src/app/config/const';

import { ModelCliente } from '../../classes/model.cliente';


@Injectable({
    providedIn: "root"
})

export class ClienteStorageService {
    private key = CONST.MAKEMONEY_MOBIL_CLIENTE;

    constructor(public storage: Storage) {
    }

    load(): Promise<any> {
        return this.storage.get(this.key);
    }

    remove() {
        return this.storage.remove(this.key);
    }

    save(model: ModelCliente) {
        this.storage.set(this.key, model);
    }


}

