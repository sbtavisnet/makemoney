import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ModelParsis } from 'src/app/models/model.parsis';
import { ParsisRepository } from 'src/app/repository/parsis.repository';


@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})



export class EmpresaListComponent implements OnInit {

  private listaParsis: ModelParsis[];

  displayedColumns: string[] = ['id', 'razao', 'cnpj', 'ativo', 'action'];
  dataSource: MatTableDataSource<ModelParsis>;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private router: Router,
    private repository: ParsisRepository) { }

  ngOnInit(): void {
    this.getAll().then(() => {
      this.dataSource = new MatTableDataSource(this.listaParsis);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  async getAll() {
    await this.repository.getAll()
      .then((res: ModelParsis[]) => {
        if (res['data'] !== undefined) {
          this.listaParsis = res['data'];
        }
      });


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showFormulario() {
    this.router.navigateByUrl('/empresa/{}');

    //this.router.navigate(['/ProjectShipment', { reportProject: this.prj }]);
  }


}

