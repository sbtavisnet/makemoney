import {
  Component,
  OnInit
} from "@angular/core";

import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import {
  Router
} from "@angular/router";

import { GrupoModel } from 'src/app/models/grupo.model';

import { ProdutoModel } from "src/app/models/produto.model";
import { SubGrupoModel } from 'src/app/models/subgrupo.model';
import { GrupoRepository } from 'src/app/repository/grupo.repository';

import { ProdutoRepository } from "src/app/repository/produto.repository";
import { SubGrupoRepository } from 'src/app/repository/subgrupo.repository';

import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: "app-produto-create",
  templateUrl: "./produto-create.component.html",
  styleUrls: ["./produto-create.component.css"],
})


export class ProdutoCreateComponent implements OnInit {
  produtoModel: ProdutoModel;
  formulario: FormGroup;

  listaGrupo: GrupoModel[];
  listaSubGrupo: SubGrupoModel[];

  constructor(private router: Router,
    private repository: ProdutoRepository,
    private repositoryGrupo: GrupoRepository,
    private repositorySubGrupo: SubGrupoRepository,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.getGrupo();
    this.showForm();
  }

  getGrupo() {
    this.repositoryGrupo.getAll()
      .then((res) => {
        this.listaGrupo = res['data'];
      });
  }

  getSubGrupo(idgrupo) {
    // this.repositorySubGrupo.getGrupo(idgrupo).subscribe((res) => {
    //   this.listaSubGrupo = res['data'];

    // });
  }

  showForm() {
    this.formulario = new FormGroup({
      id: new FormControl(0),
      idColigada: new FormControl(1),
      codigo: new FormControl(null),
      descricao: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      descricaoTexto: new FormControl(null),
      unidade: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
        ])
      ),
      idGrupo: new FormControl(0, Validators.min(1)),
      idSubGrupo: new FormControl(0, Validators.min(1)),
      apresentacao: new FormControl(null),
      informacaotecnica: new FormControl(null),
      pesoBruto: new FormControl(0),
      pesoLiquido: new FormControl(0),
      altura: new FormControl(0),
      largura: new FormControl(0),
      profundidade: new FormControl(0),
      precoVarejo: new FormControl(0),
      fatorVenda: new FormControl(1, Validators.compose([Validators.min(1)])),
      unidadeFator: new FormControl(null,
        Validators.compose([
          Validators.maxLength(2)
        ])),
    });
  }

  onSubmit() {
    this.produtoModel = this.formulario.value;
    this.produtoModel.ean = null;
    this.produtoModel.ativo = 'S';
    this.produtoModel.promocao = 'N';
    this.produtoModel.imagem = null;
    this.produtoModel.estoque = 0;
    this.produtoModel.precoAtacado = this.produtoModel.precoVarejo;

    this.repository.create(this.produtoModel)
      .then((res) => {
        if (res['success']) {
          this.utilsService.showMessage('Registro Salvo !!');
          this.router.navigate(['/produto']);
        }
      });
  }


  cancelar() {
    this.router.navigate(['/produto']);
  }

}
