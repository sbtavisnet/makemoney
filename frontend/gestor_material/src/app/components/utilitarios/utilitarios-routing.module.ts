import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialDesignModule } from 'src/app/material-design/material-design.module';

import { UtilitariosComponent } from './utilitarios.component';

import { EmpresaListComponent } from './empresa/empresa-list/empresa-list.component';
import { EmpresaComponent } from './empresa/empresa/empresa.component';
import { EstadoEditComponent } from './estados/estado-edit/estado-edit.component';
import { EstadoListComponent } from './estados/estado-list/estado-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'utilitarios', pathMatch: 'full' },
  { path: 'utilitarios', component: UtilitariosComponent },

  { path: 'empresaList', component: EmpresaListComponent },
  { path: 'empresa/:obj', component: EmpresaComponent },
  { path: 'estadolist', component: EstadoListComponent },
  { path: 'estadoedit/:obj', component: EstadoEditComponent },

];

@NgModule({
  declarations: [
    UtilitariosComponent,
    EmpresaListComponent,
    EmpresaComponent,
    EstadoListComponent,
    EstadoEditComponent],

  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignModule,

  ],
  exports: [RouterModule]
})
export class UtilitariosRoutingModule { }
