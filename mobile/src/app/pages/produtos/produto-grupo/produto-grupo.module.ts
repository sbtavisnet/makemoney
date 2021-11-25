import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/componentes/components.module';

import { ProdutoGrupoPage } from './produto-grupo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProdutoGrupoPage
      }
    ])
  ],
  declarations: [ProdutoGrupoPage]
})

export class ProdutoGrupoPageModule { }
