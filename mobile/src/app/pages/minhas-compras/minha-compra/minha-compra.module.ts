import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MinhaCompraPage } from './minha-compra';
                                 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MinhaCompraPage
      }
    ])
  ],
  declarations: [MinhaCompraPage]
})


export class MinhaCompraPageModule {}
