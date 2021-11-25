import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EstadoModel } from 'src/app/models/estado.model';
import { EstadoRepository } from 'src/app/repository/estado.repository';

@Component({
  selector: "app-estado-edit",
  templateUrl: "./estado-edit.component.html",
  styleUrls: ["./estado-edit.component.css"]
})

export class EstadoEditComponent implements OnInit {

  frmFormulario: FormGroup;

  estadoModel = { } as EstadoModel;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private repository: EstadoRepository) {
    this.formulario();
  }

  ngOnInit(): void {
    this.estadoModel = JSON.parse(this.activeRoute.snapshot.paramMap.get("obj"))
    this.formulario();
  }

  private formulario() {
    this.frmFormulario = this.formBuilder.group({
      uf: [
        this.estadoModel.uf,
        Validators.compose([Validators.required,
        Validators.minLength(2)])
      ],

      descricao: [
        this.estadoModel.descricao,
        Validators.compose([Validators.required])
      ],

      codigoIbge: [
        this.estadoModel.codigoIbge,
        Validators.compose([Validators.required,
        Validators.minLength(2)])
      ],
    });
  }

  onSubmit(ev) {

    if (JSON.stringify(this.estadoModel) !== JSON.stringify(ev)) {
      this.estadoModel = ev;
      this.repository.update(this.estadoModel);
    }

    this.router.navigateByUrl('/estadolist');
  }

}
