import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { CONST } from './config/const';
import { ClienteService } from './services/cliente/cliente.service';
import { UserStorageService } from './services/data-storage/user-storage-service';
import { InstallService } from './services/update/install.service';
import { UpdateService } from './services/update/update.service';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    public appPages = [{
        title: 'Home',
        url: '/home',
        icon: 'home'
    }];

    codcli = '';
    nomecliente = '';

    isHome = true;
    showBtn = false;

    constructor(
        private route: Router,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storage: UserStorageService,
        private clienteService: ClienteService,
        private updateService: UpdateService,
        private installService: InstallService
    ) {

        this.updateService.checkForUpdates();

        this.initializeApp();

        this.showInstallBanner();


    }




    initializeApp() {
        this.platform.ready().then(() => {

            this.getConfig();

            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }


    async getConfig() {
        return await this.storage.getConfiguracao()
            .then((res) => {
                if (res !== undefined) {
                    if (res?.codcli !== null) {
                        this.clienteService.codcli = this.storage.modelUser.codcli;
                        this.clienteService.nomecliente = this.storage.modelUser.nomcli;
                        this.codcli = this.storage.modelUser.codcli;
                        this.nomecliente = this.storage.modelUser.nomcli;

                        this.clienteService.getClienteCodigo(this.clienteService.codcli)
                            .then((res) => {
                                if (this.isHome) {
                                    this.route.navigateByUrl("/home");
                                    this.isHome = false;
                                }
                            })
                            .catch(error => {
                                console.log(error);

                                this.route.navigateByUrl("/error");

                            })
                    }
                };
            });

    }

    openPage(pagina) {

        this.route.navigateByUrl(pagina);
    }


    goSair() {
        this.storage.remove();
    }

    async showInstallBanner() {
        // atualizando
        await this.installService.checkInstall();
        this.showBtn = this.installService.showBtn;
        await this.installService.showInstallBanner();
    }





}