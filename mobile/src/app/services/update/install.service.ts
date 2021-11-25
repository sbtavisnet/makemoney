import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class InstallService {

    showBtn = false;
    private deferredPrompt: any;

    constructor() {
    }

    async checkInstall() {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();

            // Stash the event so it can be triggered later on the button event.
            this.deferredPrompt = e;

            // Update UI by showing a button to notify the user they can add to home screen
            this.showBtn = true;
        });

        //button click event to show the promt
        window.addEventListener('appinstalled', (event) => {
            alert('MAKEB2B Instalando !!!');
        });

        if (window.matchMedia('(display-mode: standalone)').matches) {
            //alert('display-mode is standalone');
        }
    }


    async showInstallBanner() {
        if (this.deferredPrompt !== undefined && this.deferredPrompt !== null) {
            // Show the prompt
            this.deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            this.deferredPrompt.userChoice
                .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('O usuário aceitou a instalação !!!');
                    } else {
                        console.log('O usuário não aceitou a instalação !!!');
                    }
                    // We no longer need the prompt.  Clear it up.
                    this.deferredPrompt = null;
                });
        }
    }


}
