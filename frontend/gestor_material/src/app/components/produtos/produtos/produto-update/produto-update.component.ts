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
import {
  ActivatedRoute
} from '@angular/router';
import { GrupoModel } from 'src/app/models/grupo.model';
import { ProdutoModel } from 'src/app/models/produto.model';
import { SubGrupoModel } from 'src/app/models/subgrupo.model';
import { GrupoRepository } from 'src/app/repository/grupo.repository';
import { ProdutoRepository } from 'src/app/repository/produto.repository';
import { SubGrupoRepository } from 'src/app/repository/subgrupo.repository';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {

  produtoModel = new ProdutoModel();
  formulario: FormGroup;

  listaGrupo: GrupoModel[];
  listaSubGrupo: SubGrupoModel[];
  _id: any;

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private repository: ProdutoRepository,
    private repositoryGrupo: GrupoRepository,
    private repositorySubGrupo: SubGrupoRepository,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this._id = JSON.parse(this.activeRoute.snapshot.paramMap.get('id'));
    this.getProdutoById(this._id);
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



  getProdutoById(id) {
    // this.repository.getById(id)
    //   .subscribe((res) => {
    //     this.produtoModel = res['data']

    //     this.getGrupo();
    //     this.getSubGrupo(this.produtoModel.idGrupo);

    //     this.showForm();
    //   });

  }

  showForm() {
    this.formulario = new FormGroup({
      id: new FormControl(this.produtoModel.id),
      idcoligada: new FormControl(this.produtoModel.idColigada),
      ean: new FormControl(this.produtoModel.ean),
      codigo: new FormControl(this.produtoModel.codigo),
      descricao: new FormControl(
        this.produtoModel.descricao,
        Validators.compose([Validators.required])
      ),
      descricaotexto: new FormControl(this.produtoModel.descricaoTexto),
      unidade: new FormControl(
        this.produtoModel.unidade,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
        ])
      ),
      idGrupo: new FormControl(this.produtoModel.idGrupo, Validators.min(this.produtoModel.idGrupo)),
      idSubGrupo: new FormControl(this.produtoModel.idSubGrupo, Validators.min(this.produtoModel.idSubGrupo)),
      apresentacao: new FormControl(this.produtoModel.apresentacao),
      informacaotecnica: new FormControl(this.produtoModel.informacaotecnica),
      pesobruto: new FormControl(this.produtoModel.pesoBruto),
      pesoliquido: new FormControl(this.produtoModel.pesoLiquido),
      altura: new FormControl(this.produtoModel.altura),
      largura: new FormControl(this.produtoModel.largura),
      profundidade: new FormControl(this.produtoModel.profundidade),
      precovarejo: new FormControl(this.produtoModel.precoVarejo),
      fatorvenda: new FormControl(this.produtoModel.fatorVenda, Validators.compose([Validators.min(1)])),
      unidadefator: new FormControl(this.produtoModel.unidadeFator,
        Validators.compose([
          Validators.maxLength(2)
        ])),
      ativo: new FormControl(this.produtoModel.ativo),

    });
  }

  onSubmit() {
    this.produtoModel = this.formulario.value;
    this.repository.update(this.produtoModel)
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
