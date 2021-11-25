import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GrupoModel } from 'src/app/models/grupo.model';
import { GrupoRepository } from 'src/app/repository/grupo.repository';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-grupo-delete',
  templateUrl: './grupo-delete.component.html',
  styleUrls: ['./grupo-delete.component.css']
})

export class GrupoDeleteComponent implements OnInit {

  grupo: GrupoModel = new GrupoModel();
  _id: any;


  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private repository: GrupoRepository,
    private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this._id = JSON.parse(this.activeRoute.snapshot.paramMap.get('id'));
    this.repository.getById(this._id)
      .then((res) => {
        this.grupo = res['data']
      });
  }



  delete(): void {
    this.repository.delete(this.grupo.id)
      .then((res) => {
        console.log(res);
        if (res['success']) {
          this.utilsService.showMessage('Registro excluido com sucesso !!');
          this.router.navigate(['/grupo']);
        }

      });
  }

  cancel(): void {
    this.router.navigate(["/grupo"]);
  }

}
