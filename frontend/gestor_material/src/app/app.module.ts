import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialDesignModule } from './material-design/material-design.module';
import { CepService } from './services/cep.service';
import { UtilsService } from './services/utils.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuGeralComponent } from './components/menu-geral/menu-geral.component';
import { MenuComponent } from './components/menu/menu.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { UtilitariosModule } from './components/utilitarios/utilitarios.module';
import { MenuProdutosComponent } from './components/produtos/menuprodutos/menu-produtos.component';
import { NavComponent } from './components/templates/nav/nav.component';
import { GrupoCreateComponent } from './components/produtos/grupos/grupo-create/grupo-create.component';
import { GrupoDeleteComponent } from './components/produtos/grupos/grupo-delete/grupo-delete.component';
import { GrupoUpdateComponent } from './components/produtos/grupos/grupo-update/grupo-update.component';
import { GrupoComponent } from './components/produtos/grupos/grupo/grupo.component';
import { ProdutoCreateComponent } from './components/produtos/produtos/produto-create/produto-create.component';
import { ProdutoDeleteComponent } from './components/produtos/produtos/produto-delete/produto-delete.component';
import { ProdutoUpdateComponent } from './components/produtos/produtos/produto-update/produto-update.component';
import { ProdutoComponent } from './components/produtos/produtos/produto/produto.component';
import { SubgrupoCreateComponent } from './components/produtos/subgrupos/subgrupo-create/subgrupo-create.component';
import { SubgrupoDeleteComponent } from './components/produtos/subgrupos/subgrupo-delete/subgrupo-delete.component';
import { SubgrupoComponent } from './components/produtos/subgrupos/subgrupo/subgrupo.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,

    MenuComponent,
    HomeComponent,
    SobreComponent,

    LoginComponent,
    MenuGeralComponent,
    MenuProdutosComponent,
    ProdutoComponent,
    ProdutoCreateComponent,
    ProdutoUpdateComponent,
    ProdutoDeleteComponent,

    GrupoComponent,
    GrupoCreateComponent,
    GrupoUpdateComponent,
    GrupoDeleteComponent,
    SubgrupoComponent,
    SubgrupoCreateComponent,
    SubgrupoCreateComponent,
    SubgrupoDeleteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialDesignModule,

    UtilitariosModule,
  ],
  exports: [],
  providers: [UtilsService, CepService],
  bootstrap: [AppComponent]
})
export class AppModule { }
