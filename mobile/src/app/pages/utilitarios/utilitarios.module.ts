import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/componentes/components.module';

import { UtilitariosPageRoutingModule } from './utilitarios-routing.module';
import { UtilitariosPage } from './utilitarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    UtilitariosPageRoutingModule
  ],
  declarations: [UtilitariosPage]
})
export class UtilitariosPageModule { }



