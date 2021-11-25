import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/componentes/components.module';

import { SubGruposPage } from './subgrupos';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SubGruposPage
      }
    ])
  ],
  declarations: [SubGruposPage]
})

export class SubGruposPageModule { }
