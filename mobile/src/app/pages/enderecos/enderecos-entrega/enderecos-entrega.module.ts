import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/componentes/components.module';

import { EnderecosEntregaPageRoutingModule } from './enderecos-entrega-routing.module';
import { EnderecosEntregaPage } from './enderecos-entrega.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    EnderecosEntregaPageRoutingModule
  ],
  declarations: [EnderecosEntregaPage]
})
export class EnderecosEntregaPageModule { }
