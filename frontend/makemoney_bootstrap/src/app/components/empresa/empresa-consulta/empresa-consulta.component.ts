import { Component, OnInit, ViewChild } from '@angular/core';

import { ModelParsis } from 'src/app/models/model.parsis';

import { ParsisRepository } from '../../../repository/parsis.repository';

@Component({
  selector: 'app-empresa-consulta',
  templateUrl: './empresa-consulta.component.html',
  styleUrls: ['./empresa-consulta.component.css']
})



export class EmpresaConsultaComponent implements OnInit {

  public titulo = 'Empresa';

  public listaParsis: any;
  dtOptions: DataTables.Settings = {};

  @ViewChild('dataTable', { static: true }) table;


  constructor(private repository: ParsisRepository) { }

  ngOnInit(): void {
    this.repository.getAll()
      .then((res: ModelParsis) => {
        this.listaParsis = res;



        this.dtOptions = {
          data: this.listaParsis,
          columns: [
            { title: 'ID', data: 'id' },
            { title: 'Razao', data: 'razao' },
            { title: 'CNPJ', data: 'cnpj' },
            { title: 'ativo', data: 'ativo' }

          ]
        };
      });
  }



}
