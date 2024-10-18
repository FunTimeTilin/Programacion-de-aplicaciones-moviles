import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessorDashboardPage } from './professor-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessorDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessorDashboardPageRoutingModule {}
