import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProdutoModel } from 'src/app/models/produto.model';
import { ProdutoRepository } from 'src/app/repository/produto.repository';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})


export class ProdutoComponent implements OnInit {

  private lista: ProdutoModel[];
  displayedColumns: string[] = ['codigo', 'descricao', 'ativo', 'actions'];

  dataSource: MatTableDataSource<ProdutoModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router,
    private repository: ProdutoRepository) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.repository.getAll()
      .then((res: ProdutoModel[]) => {
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
