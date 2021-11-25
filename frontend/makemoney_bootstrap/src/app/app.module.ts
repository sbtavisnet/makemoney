import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { StorageServiceModule } from 'ngx-webstorage-service';

import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ParsisRepository } from './repository/parsis.repository';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeadertableComponent } from './components/headertable/headertable.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { EmpresaConsultaComponent } from './components/empresa/empresa-consulta/empresa-consulta.component';
import { EmpresaComponent } from './components/empresa/empresa/empresa.component';

@NgModule({
  declarations: [AppComponent,
    MenuComponent,
    EmpresaConsultaComponent,
    EmpresaComponent,
    LoginComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    HeadertableComponent,
  ],

  imports: [BrowserModule,
    AppRoutingModule,
    FormsModule,
    StorageServiceModule,
    HttpClientModule,
    CommonModule,
    DataTablesModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [ParsisRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }
