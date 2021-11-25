import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProdutoDetailPage } from './produto-detail';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProdutoDetailPage
      }
    ])
  ],
  declarations: [ProdutoDetailPage]
})


export class ProdutoDetailPageModule {}
