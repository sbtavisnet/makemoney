import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MinhaCompraItensPage } from './minha-compra-itens';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MinhaCompraItensPage
      }
    ])
  ],
  declarations: [MinhaCompraItensPage]
})

export class MinhaCompraItensPageModule {}
