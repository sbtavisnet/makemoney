import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GrupoModel } from 'src/app/models/grupo.model';
import { GrupoRepository } from 'src/app/repository/grupo.repository';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-grupo-update',
  templateUrl: './grupo-update.component.html',
  styleUrls: ['./grupo-update.component.css']
})
export class GrupoUpdateComponent implements OnInit {

  grupoModel: GrupoModel = new GrupoModel();
  formulario: FormGroup;
  id: any;



  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private repository: GrupoRepository,
    private utilsService: UtilsService) { }



  ngOnInit(): void {
    this.showForm();
    this.getById();
  }


  getById() {
    this.id = JSON.parse(this.activeRoute.snapshot.paramMap.get('id'));

    this.repository.getById(this.id)
      .then((res: GrupoModel) => {
        this.grupoModel = res['data'];
        console.log(this.grupoModel);
        this.showForm();
      });
  }


  private showForm() {
    this.formulario = new FormGroup({
      id: new FormControl(this.grupoModel.id),
      codigo: new FormControl(this.grupoModel.codigo),
      descricao: new FormControl(this.grupoModel.descricao,
        Validators.compose([Validators.required])),
      ativo: new FormControl(this.grupoModel.ativo,
        Validators.compose([Validators.required,
        Validators.maxLength(1),
        Validators.minLength(1)])),
      ordem: new FormControl(this.grupoModel.ordem),
      imagem: new FormControl(this.grupoModel.imagem),

    });
  }

  onSubmit() {
    this.grupoModel = this.formulario.value;
    this.grupoModel.ativo = this.grupoModel.ativo.toUpperCase();
    this.repository.save(this.grupoModel)
      .then((res) => {
        if (res['success']) {
          this.utilsService.showMessage('Registro Salvo !!');
          this.router.navigate(['/grupo']);
        }
      });
  }

  cancelar() {
    this.router.navigate(['/grupo']);
  }



}
