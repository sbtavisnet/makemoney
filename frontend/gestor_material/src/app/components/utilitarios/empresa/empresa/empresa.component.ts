import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { ModelParsis } from 'src/app/models/model.parsis';
import { ModelRegimeTributario } from 'src/app/models/model.regimetributario';
import { ParsisRepository } from 'src/app/repository/parsis.repository';
import { CepService } from 'src/app/services/cep.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: "app-empresa",
  templateUrl: "./empresa.component.html",
  styleUrls: ["./empresa.component.css"]
})
export class EmpresaComponent implements OnInit {
  frmEmpresa: FormGroup;

  modelParis = {} as ModelParsis;

  regimeTributario: ModelRegimeTributario[] = [
    { id: 1, descricao: 'Simples Nacional' },
    { id: 2, descricao: 'Simples Nacional – Excesso de Sublimite de Receita Bruta' },
    { id: 3, descricao: 'Lucro Presumido ou Lucro Real' }
  ];



  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private repository: ParsisRepository,
    private cepService: CepService,
    private utilsService: UtilsService) {

  }

  ngOnInit(): void {
    this.modelParis = JSON.parse(this.activeRoute.snapshot.paramMap.get("obj"))
    this.formulario();
  }



  private formulario() {
    this.frmEmpresa = this.formBuilder.group({
      id: [this.modelParis.id],
      razao: [this.modelParis.razao, Validators.compose([Validators.required])],
      fantasia: [
        this.modelParis.fantasia,
        Validators.compose([Validators.required])
      ],

      cep: [
        this.modelParis.cep,
        Validators.compose([Validators.required,
        Validators.minLength(8)])
      ],

      endereco: [
        this.modelParis.endereco,
        Validators.compose([Validators.required])
      ],

      numero: [
        this.modelParis.numero,
        Validators.compose([Validators.required])
      ],
      complemento: [this.modelParis.endereco],
      bairro: [
        this.modelParis.bairro,
        Validators.compose([Validators.required])
      ],
      cidade: [
        this.modelParis.cidade,
        Validators.compose([Validators.required])
      ],
      uf: [this.modelParis.uf, Validators.compose([Validators.required,
      Validators.minLength(2)])],

      cnpj: [
        this.modelParis.cnpj,
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14)
        ])
      ],
      ie: [this.modelParis.ie, Validators.compose([Validators.required])],

      email: [this.modelParis.email],

      fone: [this.modelParis.fone, Validators.compose([Validators.required])],
      ramoatividade: [
        this.modelParis.ramoatividade,
        Validators.compose([Validators.required])
      ],
      codigoibge: [
        this.modelParis.codigoibge,
        Validators.compose([Validators.required])
      ],
      regime: [
        this.modelParis.regime,
        Validators.compose([Validators.required])
      ],
      ativo: [this.modelParis.ativo, Validators.compose([Validators.required])]
    });
  }

  onSubmit(ev) {

    if (JSON.stringify(this.modelParis) !== JSON.stringify(ev)) {
      console.log('diferente');
      console.log(JSON.stringify(this.modelParis), JSON.stringify(ev));

      this.modelParis = ev;

      this.repository.save(this.modelParis);
    }
    this.router.navigateByUrl('/empresaList');

  }

  getCep(ev: string) {

    const acep = this.utilsService.somenteNumero(ev);

    if (acep?.length === 8) {
      this.cepService.getCep(acep)
        .then(res => {

          this.frmEmpresa.get('endereco').setValue(res['logradouro']);
          this.frmEmpresa.get('complemento').setValue(res['complemento']);
          this.frmEmpresa.get('bairro').setValue(res['bairro']);
          this.frmEmpresa.get('cidade').setValue(res['localidade']);
          this.frmEmpresa.get('uf').setValue(res['uf']);
          this.frmEmpresa.get('codigoibge').setValue(res['ibge']);

        });


    }

  }

}
