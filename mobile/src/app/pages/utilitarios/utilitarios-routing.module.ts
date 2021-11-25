import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtilitariosPage } from './utilitarios.page';

const routes: Routes = [
  {
    path: '',
    component: UtilitariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilitariosPageRoutingModule {}
