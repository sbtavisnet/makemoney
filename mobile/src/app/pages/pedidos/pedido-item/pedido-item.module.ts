import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ComponentsModule } from 'src/app/componentes/components.module';

import { PedidoItemPage } from "./pedido-item.page";

const routes: Routes = [
  {
    path: "",
    component: PedidoItemPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedidoItemPage]
})
export class PedidoItemPageModule { }
