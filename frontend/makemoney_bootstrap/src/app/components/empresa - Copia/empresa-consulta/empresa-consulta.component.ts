import { Component, OnInit, Directive, Input, Output, EventEmitter, QueryList, ViewChildren } from '@angular/core';

import { ModelParsis } from 'src/app/models/model.parsis';

import { ParsisRepository } from '../../../repository/parsis.repository';


export type SortColumn = keyof ModelParsis | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}


@Component({
  selector: 'app-empresa-consulta',
  templateUrl: './empresa-consulta.component.html',
  styleUrls: ['./empresa-consulta.component.css']
})



export class EmpresaConsultaComponent implements OnInit {

  public titulo = 'Empresa';

  public listaParsis: any;
  public listaSort: any;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


  constructor(private repository: ParsisRepository) { }

  ngOnInit(): void {

    this.repository.getAll()
      .then((res: ModelParsis) => {
        this.listaParsis = res;
        this.listaSort = this.listaParsis;
        console.log(this.listaParsis);
      });

  }



  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.listaParsis = this.listaSort;
    } else {
      this.listaParsis = [...this.listaSort].sort((a, b) => {
        const res = compare(`${a[column]}`, `${b[column]}`);
        return direction === 'asc' ? res : -res;
      });
    }
  }

}
