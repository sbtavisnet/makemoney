import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';

import { GrupoModel } from 'src/app/models/grupo.model';
import { GrupoRepository } from 'src/app/repository/grupo.repository';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-grupo-create',
  templateUrl: './grupo-create.component.html',
  styleUrls: ['./grupo-create.component.css']
})
export class GrupoCreateComponent implements OnInit {

  grupoModel: GrupoModel;
  formulario: FormGroup;

  constructor(private router: Router,
    private repository: GrupoRepository,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.showForm();
  }


  private showForm() {
    this.formulario = new FormGroup({
      id: new FormControl(0),
      codigo: new FormControl(null),
      descricao: new FormControl(null,
        Validators.compose([Validators.required])),
      ativo: new FormControl('S',
        Validators.compose([Validators.required,
        Validators.maxLength(1),
        Validators.minLength(1)
        ])),
      ordem: new FormControl(0),
      imagem: new FormControl(''),


    });
  }



  async onSubmit() {
    this.grupoModel = this.formulario.value;
    this.grupoModel.ativo = this.grupoModel.ativo.toUpperCase();

    await this.repository.save(this.grupoModel)
      .then((res) => {
        if (res === undefined) {
          this.utilsService.showMessage('Atenção !!! Não foi possivel inserir o registro !!!');
          return;
        }

        if (res["success"]) {
          this.utilsService.showMessage('Registro Salvo !!');
          this.router.navigate(['/grupo']);
        }

      }),
      error => {
        console.log(error);
      };
  }

  cancelar() {
    this.router.navigate(['/grupo']);
  }

}
