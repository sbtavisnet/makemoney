import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { SubGrupoModel } from 'src/app/models/subgrupo.model';
import { SubGrupoRepository } from 'src/app/repository/subgrupo.repository';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-subgrupo-create',
  templateUrl: './subgrupo-create.component.html',
  styleUrls: ['./subgrupo-create.component.css']
})
export class SubgrupoCreateComponent implements OnInit {

  subgrupoModel: SubGrupoModel;
  formulario: FormGroup;

  idgrupo: any;


  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private repository: SubGrupoRepository,
    private utilsService: UtilsService) {


  }


  ngOnInit(): void {

    this.idgrupo = JSON.parse(this.activeRoute.snapshot.paramMap.get('idgrupo'));
    this.showForm();
  }


  private showForm() {
    this.formulario = new FormGroup({
      id: new FormControl(0),
      codigo: new FormControl(null),
      // codigo: new FormControl(null,
      //   Validators.compose([Validators.required,
      //   Validators.maxLength(2),
      //   Validators.minLength(2)])),

      descricao: new FormControl(null,
        Validators.compose([Validators.required])),
      ativo: new FormControl('S',
        Validators.compose([Validators.required,
        Validators.maxLength(1),
        Validators.minLength(1)])),
      imagem: new FormControl(''),

    });
  }


  onSubmit() {

    this.subgrupoModel = this.formulario.value;
    this.subgrupoModel.idgrupo = this.idgrupo;
    this.subgrupoModel.ativo = this.subgrupoModel.ativo.toUpperCase();

    this.repository.create(this.subgrupoModel)
      .then((res) => {
        if (res['success']) {
          this.utilsService.showMessage('Registro Salvo !!');
          this.router.navigate(['/subgrupo',
            JSON.stringify(this.idgrupo)]);
        }
      });
  }

  cancelar() {
    this.router.navigate(['/subgrupo',
      JSON.stringify(this.idgrupo)]);

  }


}
