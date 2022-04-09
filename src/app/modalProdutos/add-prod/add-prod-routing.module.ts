import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProdPage } from './add-prod.page';

const routes: Routes = [
  {
    path: '',
    component: AddProdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProdPageRoutingModule {}
