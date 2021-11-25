import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserStorageService } from 'src/app/services/data-storage/user-storage-service';

@Component({
  selector: 'app-utilitarios',
  templateUrl: './utilitarios.page.html',
  styleUrls: ['./utilitarios.page.scss'],
})
export class UtilitariosPage implements OnInit {

  constructor(private route: Router,
    private storage: UserStorageService) { }

  ngOnInit() {
    this.storage.getConfiguracao();
  }


  openPageLogin() {
    this.storage.remove();
    this.route.navigateByUrl('/login');
  }


  openPage(pagina) {
    this.route.navigateByUrl(pagina);
  }


}
