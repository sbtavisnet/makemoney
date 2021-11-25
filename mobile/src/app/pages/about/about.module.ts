import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RodapeComponent } from 'src/app/componentes/rodape/rodape.component';

import { ComponentsModule } from '../../componentes/components.module';

import { AboutPage } from './about';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,

    RouterModule.forChild([
      {
        path: '',
        component: AboutPage
      }
    ])
  ],
  declarations: [
    AboutPage
  ]
})

export class AboutPageModule { }
