import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { GrupoModel } from 'src/app/models/grupo.model';
import { GrupoRepository } from 'src/app/repository/grupo.repository';


@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  private lista: any;

  displayedColumns: string[] = ['codigo', 'descricao', 'ativo', 'actions'];
  dataSource: MatTableDataSource<GrupoModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private router: Router,
    private repository: GrupoRepository) { }

  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.repository.getAll()
      .then((res: GrupoModel[]) => {
        this.lista = res['data'];
        this.dataSource = new MatTableDataSource(this.lista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


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




