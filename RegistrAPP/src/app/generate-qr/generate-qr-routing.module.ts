import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateQRPage } from './generate-qr.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateQRPageRoutingModule {}
