
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EnderecoComponent } from './endereco/endereco.component';
import { MenuHeaderBackerComponent } from './menu-header-backer/menu-header-backer.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { ProdutoImagemComponent } from './produto-imagem/produto-imagem.component';
import { RodapeComponent } from './rodape/rodape.component';
import { ToobarComponent } from './toobar/toobar.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  declarations: [
    ToobarComponent,
    ProdutoImagemComponent,
    EnderecoComponent,
    MenuHeaderComponent,
    MenuHeaderBackerComponent,
    RodapeComponent,
  ],
  exports: [
    ToobarComponent,
    ProdutoImagemComponent,
    EnderecoComponent,
    MenuHeaderComponent,
    MenuHeaderBackerComponent,
    RodapeComponent
  ]
})
export class ComponentsModule { }
