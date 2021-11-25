import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { EmpresaConsultaComponent } from './components/empresa/empresa-consulta/empresa-consulta.component';
import { EmpresaComponent } from './components/empresa/empresa/empresa.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: 'Login', component: LoginComponent },

  {
    path: 'Empresaconsulta', component: EmpresaConsultaComponent,
    children:
      [
        { path: 'Empresa', component: EmpresaComponent },
      ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
