import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProdPageRoutingModule } from './add-prod-routing.module';

import { AddProdPage } from './add-prod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProdPageRoutingModule
  ],
  declarations: [AddProdPage]
})
export class AddProdPageModule {}
