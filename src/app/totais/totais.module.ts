import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TotaisPageRoutingModule } from './totais-routing.module';

import { TotaisPage } from './totais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TotaisPageRoutingModule
  ],
  declarations: [TotaisPage]
})
export class TotaisPageModule {}
