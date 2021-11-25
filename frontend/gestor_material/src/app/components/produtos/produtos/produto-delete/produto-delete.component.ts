import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  ProdutoModel
} from 'src/app/models/produto.model';
import { ProdutoRepository } from 'src/app/repository/produto.repository';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {


  produtoModel: ProdutoModel = new ProdutoModel();
  _id: any;

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private repository: ProdutoRepository,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
    this._id = JSON.parse(this.activeRoute.snapshot.paramMap.get('id'));
    // this.repository.getById(this._id)
    //   .subscribe((res) => {
    //     this.produtoModel = res['data']
    //   });
  }



  delete(): void {
    this.repository.delete(this.produtoModel.id)
      .then((res) => {
        if (res['success']) {
          this.utilsService.showMessage('Registro excluido com sucesso !!');
          this.router.navigate(['/produto']);
        }

      });
  }

  cancel(): void {
    this.router.navigate(["/produto"]);
  }


}
