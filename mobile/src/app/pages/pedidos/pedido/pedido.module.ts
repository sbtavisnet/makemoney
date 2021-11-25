import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ComponentsModule } from 'src/app/componentes/components.module';

import { PedidoPage } from "./pedido.page";

const routes: Routes = [
  {
    path: "",
    component: PedidoPage
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
  declarations: [PedidoPage]
})
export class PedidoPageModule { }
