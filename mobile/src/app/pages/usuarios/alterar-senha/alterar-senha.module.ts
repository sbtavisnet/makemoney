import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../../componentes/components.module';

import { AlterarSenhaPageRoutingModule } from './alterar-senha-routing.module';
import { AlterarSenhaPage } from './alterar-senha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    AlterarSenhaPageRoutingModule
  ],
  declarations: [AlterarSenhaPage]
})
export class AlterarSenhaPageModule { }
