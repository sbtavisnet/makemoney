import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';

import { SubGrupoModel } from 'src/app/models/subgrupo.model';
import { GrupoRepository } from 'src/app/repository/grupo.repository';
import { SubGrupoRepository } from 'src/app/repository/subgrupo.repository';
import { GrupoModel } from 'src/app/models/grupo.model';

@Component({
  selector: 'app-subgrupo',
  templateUrl: './subgrupo.component.html',
  styleUrls: ['./subgrupo.component.css']
})


export class SubgrupoComponent implements OnInit {


  private lista: SubGrupoModel[];

  grupoModel: GrupoModel;
  idgrupo: any;

  displayedColumns: string[] = ['codigo', 'descricao', 'ativo', 'actions'];
  dataSource: MatTableDataSource<SubGrupoModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private repositoryGrupo: GrupoRepository,
    private repository: SubGrupoRepository) { }

  ngOnInit(): void {
    this.idgrupo = JSON.parse(this.activeRoute.snapshot.paramMap.get('idgrupo'));
    this.getGrupo(this.idgrupo);
    this.getAll();
  }

  getGrupo(idgrupo) {
    // this.repositoryGrupo.getById(idgrupo)
    //   .subscribe((res: GrupoModel) => {
    //     this.grupoModel = res['data'];

    //   });

  }

  getAll() {
    // this.repository.getGrupo(this.idgrupo)
    //   .subscribe((res: SubGrupoModel[]) => {
    //     this.lista = res['data'];
    //     this.dataSource = new MatTableDataSource(this.lista);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  showCreate() {
    this.router.navigate(['/subgrupo-create',
      JSON.stringify(this.idgrupo)]);
  }

}



