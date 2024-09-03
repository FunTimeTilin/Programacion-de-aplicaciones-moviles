import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { MainPage } from '../main/main.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    
  },
  {path: 'main',
    component: MainPage,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
