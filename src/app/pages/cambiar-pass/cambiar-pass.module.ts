import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarPassPageRoutingModule } from './cambiar-pass-routing.module';

import { CambiarPassPage } from './cambiar-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarPassPageRoutingModule
  ],
  declarations: [CambiarPassPage]
})
export class CambiarPassPageModule {}
