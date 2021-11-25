import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/componentes/components.module';

import { EnderecoEditPageRoutingModule } from './endereco-edit-routing.module';
import { EnderecoEditPage } from './endereco-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    EnderecoEditPageRoutingModule
  ],
  declarations: [EnderecoEditPage]
})
export class EnderecoEditPageModule { }
