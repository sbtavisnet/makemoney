import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { EstadoRepository } from 'src/app/repository/estado.repository';
import { EstadoModel } from 'src/app/models/estado.model';

@Component({
  selector: 'app-estado-list',
  templateUrl: './estado-list.component.html',
  styleUrls: ['./estado-list.component.css']
})


export class EstadoListComponent implements OnInit {

  public lista: EstadoModel[];

  displayedColumns: string[] = ['uf', 'descricao', 'codigoibge', 'action'];
  dataSource: MatTableDataSource<EstadoModel>;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private router: Router,
    private repository: EstadoRepository) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getDados();
  }

  getDados() {
    this.getAll().then(() => {
      this.dataSource = new MatTableDataSource(this.lista);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  async getAll() {
    await this.repository.getAll()
      .then((res: EstadoModel[]) => {
        if (res['data'] !== undefined) {
          this.lista = res['data'];
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


}

