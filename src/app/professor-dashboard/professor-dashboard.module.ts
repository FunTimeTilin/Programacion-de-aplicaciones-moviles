import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessorDashboardPageRoutingModule } from './professor-dashboard-routing.module';

import { ProfessorDashboardPage } from './professor-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfessorDashboardPageRoutingModule
  ],
  declarations: [ProfessorDashboardPage]
})
export class ProfessorDashboardPageModule {}
