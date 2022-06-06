import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TotaisPage } from './totais.page';

const routes: Routes = [
  {
    path: '',
    component: TotaisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TotaisPageRoutingModule {}
