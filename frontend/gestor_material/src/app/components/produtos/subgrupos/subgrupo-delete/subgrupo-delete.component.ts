import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubGrupoModel } from 'src/app/models/subgrupo.model';
import { SubGrupoRepository } from 'src/app/repository/subgrupo.repository';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-subgrupo-delete',
  templateUrl: './subgrupo-delete.component.html',
  styleUrls: ['./subgrupo-delete.component.css']
})
export class SubgrupoDeleteComponent implements OnInit {


  subgrupo: SubGrupoModel = new SubGrupoModel();
  _id: any;
  _idgrupo: any;


  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private repository: SubGrupoRepository,
    private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this._id = JSON.parse(this.activeRoute.snapshot.paramMap.get('id'));
    this._idgrupo = JSON.parse(this.activeRoute.snapshot.paramMap.get('idgrupo'));

    console.log('sanderson')
    // this.repository.getById(this._id)
    //   .subscribe((res) => {
    //     this.subgrupo = res['data']

    //   });

  }



  delete(): void {
    this.repository.delete(this.subgrupo.id)
      .then((res) => {
        console.log(res);
        if (res['success']) {
          this.utilsService.showMessage('Registro excluido com sucesso !!');
          this.router.navigate(['/subgrupo', JSON.stringify(this._idgrupo)]);
        }

      });
  }

  cancel(): void {
    this.router.navigate(['/subgrupo', JSON.stringify(this._idgrupo)]);
  }


}

