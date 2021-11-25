import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnderecoEditPage } from './endereco-edit.page';

const routes: Routes = [
  {
    path: '',
    component: EnderecoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnderecoEditPageRoutingModule {}
