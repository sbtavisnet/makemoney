import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { MenuProdutosComponent } from './components/produtos/menuprodutos/menu-produtos.component';
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


const routes: Routes = [
  { path: '', redirectTo: '/nav', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'utilitarios',
    loadChildren: () => import('src/app/components/utilitarios/utilitarios.module')
      .then(m => m.UtilitariosModule)
  },


  // { path: 'nav', component: NavComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },

  // { path: 'empresaList', component: EmpresaListComponent },
  // { path: 'empresa/:obj', component: EmpresaComponent },

  // { path: 'utilitarios', component: UtilitariosComponent },

  // { path: 'estadolist', component: EstadoListComponent },
  // { path: 'estadoedit/:obj', component: EstadoEditComponent },



  { path: 'sobre', component: SobreComponent },

  { path: 'menuprodutos', component: MenuProdutosComponent },
  { path: 'produto', component: ProdutoComponent },
  { path: 'produto-create', component: ProdutoCreateComponent },
  { path: 'produto-update', component: ProdutoUpdateComponent },
  { path: 'produto-delete', component: ProdutoDeleteComponent },
  { path: 'grupo', component: GrupoComponent },
  { path: 'grupo-create', component: GrupoCreateComponent },
  { path: 'grupo-update/:id', component: GrupoUpdateComponent },
  { path: 'grupo-delete/:id', component: GrupoDeleteComponent },
  { path: 'subgrupo', component: SubgrupoComponent },
  { path: 'subgrupo-create', component: SubgrupoCreateComponent },
  { path: 'subgrupo-update', component: SubgrupoCreateComponent },
  { path: 'subgrupo-detele', component: SubgrupoDeleteComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
