import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: './pages/home/home.module#HomePageModule'
  },

  { path: 'login', loadChildren: './pages/usuarios/login/login.module#LoginPageModule' },

  { path: 'about', canActivate: [AuthGuard], loadChildren: './pages/about/about.module#AboutPageModule' },

  { path: 'produto', canActivate: [AuthGuard], loadChildren: './pages/produtos/produto/produto.module#ProdutoPageModule' },
  { path: 'grupos', canActivate: [AuthGuard], loadChildren: './pages/produtos/grupos/grupos.module#GruposPageModule' },
  { path: 'subgrupos', canActivate: [AuthGuard], loadChildren: './pages/produtos/subgrupos/subgrupos.module#SubGruposPageModule' },

  { path: 'produtogrupo', canActivate: [AuthGuard], loadChildren: './pages/produtos/produto-grupo/produto-grupo.module#ProdutoGrupoPageModule' },

  { path: 'produtodetail/:produto_codpro', canActivate: [AuthGuard], loadChildren: './pages/produtos/produto-detail/produto-detail.module#ProdutoDetailPageModule' },

  { path: 'titulos', canActivate: [AuthGuard], loadChildren: './pages/titulos/titulos.module#TitulosPageModule' },
  { path: 'minha-compra', canActivate: [AuthGuard], loadChildren: './pages/minhas-compras/minha-compra/minha-compra.module#MinhaCompraPageModule' },
  { path: 'minha-compra-itens/:dadosItens', canActivate: [AuthGuard], loadChildren: './pages/minhas-compras/minha-compra-itens/minha-compra-itens.module#MinhaCompraItensPageModule' },

  { path: 'pedido', canActivate: [AuthGuard], loadChildren: './pages/pedidos/pedido/pedido.module#PedidoPageModule' },
  { path: 'pedido-item', canActivate: [AuthGuard], loadChildren: './pages/pedidos/pedido-item/pedido-item.module#PedidoItemPageModule' },
  { path: 'carrinho', canActivate: [AuthGuard], loadChildren: './pages/carrinho/carrinho.module#CarrinhoPageModule' },
  { path: 'pedido-finalizar/:produtosNoCarrinho', canActivate: [AuthGuard], loadChildren: './pages/pedidos/pedido-finalizar/pedido-finalizar.module#PedidoFinalizarPageModule' },

  { path: 'endereco-edit', canActivate: [AuthGuard], loadChildren: './pages/enderecos/endereco-edit/endereco-edit.module#EnderecoEditPageModule' },

  { path: 'enderecosentrega', canActivate: [AuthGuard], loadChildren: './pages/enderecos/enderecos-entrega/enderecos-entrega.module#EnderecosEntregaPageModule' },

  { path: 'utilitarios', canActivate: [AuthGuard], loadChildren: './pages/utilitarios/utilitarios.module#UtilitariosPageModule' },

  { path: 'alterarsenha', canActivate: [AuthGuard], loadChildren: './pages/usuarios/alterar-senha/alterar-senha.module#AlterarSenhaPageModule' },
  { path: 'error', loadChildren: './pages/error/error.module#ErrorPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
