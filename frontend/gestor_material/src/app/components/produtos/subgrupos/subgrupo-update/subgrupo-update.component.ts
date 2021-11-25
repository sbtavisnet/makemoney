import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubGrupoModel } from 'src/app/models/subgrupo.model';
import { SubGrupoRepository } from 'src/app/repository/subgrupo.repository';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-subgrupo-update',
  templateUrl: './subgrupo-update.component.html',
  styleUrls: ['./subgrupo-update.component.css']
})
export class SubgrupoUpdateComponent implements OnInit {


  subgrupoModel: SubGrupoModel = new SubGrupoModel();
  formulario: FormGroup;
  idgrupo: any;
  id: any;



  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private repository: SubGrupoRepository,
    private utilsService: UtilsService) { }



  ngOnInit(): void {
    this.showForm();
    this.getById();
  }


  getById() {
    this.id = JSON.parse(this.activeRoute.snapshot.paramMap.get('id'));
    this.idgrupo = JSON.parse(this.activeRoute.snapshot.paramMap.get('idgrupo'));

    // this.repository.getById(this.id)
    //   .subscribe((res: SubGrupoModel) => {
    //     this.subgrupoModel = res['data'];

    //     console.log(this.subgrupoModel);


    //     this.showForm();

    //   });


  }


  private showForm() {
    this.formulario = new FormGroup({
      id: new FormControl(this.subgrupoModel.id),
      codigo: new FormControl(this.subgrupoModel.codigo),
      descricao: new FormControl(this.subgrupoModel.descricao,
        Validators.compose([Validators.required])),
      ativo: new FormControl(this.subgrupoModel.ativo,
        Validators.compose([Validators.required,
        Validators.maxLength(1),
        Validators.minLength(1)])),
      imagem: new FormControl(this.subgrupoModel.imagem),

    });
  }

  onSubmit() {
    this.subgrupoModel = this.formulario.value;
    this.subgrupoModel.ativo = this.subgrupoModel.ativo.toUpperCase();
    this.subgrupoModel.idgrupo = this.idgrupo;
    this.repository.update(this.subgrupoModel)
      .then((res) => {
        if (res['success']) {
          this.utilsService.showMessage('Registro Salvo !!');
          this.router.navigate(['/subgrupo', JSON.stringify(this.idgrupo)]);
        }
      });
  }

  cancelar() {
    this.router.navigate(['/subgrupo', JSON.stringify(this.idgrupo)]);
  }



}

