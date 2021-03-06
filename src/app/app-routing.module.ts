import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'pagamento/:codPedido/:soma',
    loadChildren: () => import('./pagamento/pagamento.module').then( m => m.PagamentoPageModule)
  },
  {
    path: 'modal/:dados',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'add-prod',
    loadChildren: () => import('./modalProdutos/add-prod/add-prod.module').then( m => m.AddProdPageModule)
  },
  {
    path: 'entregas',
    loadChildren: () => import('./modalProdutos/entregas/entregas.module').then( m => m.EntregasPageModule)
  },
  {
    path: 'totais',
    loadChildren: () => import('./totais/totais.module').then( m => m.TotaisPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
