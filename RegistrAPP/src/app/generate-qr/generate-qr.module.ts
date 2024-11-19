import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateQRPageRoutingModule } from './generate-qr-routing.module';

import { GenerateQRPage } from './generate-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateQRPageRoutingModule
  ],
  declarations: [GenerateQRPage]
})
export class GenerateQRPageModule {}
