import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',  // Cambiar aquí para redirigir al login
    pathMatch: 'full'
  },
  {
    path: 'scan-qr',
    loadChildren: () => import('./scan-qr/scan-qr.module').then(m => m.ScanQRPageModule)
  },
  {
    path: 'generate-qr',
    loadChildren: () => import('./generate-qr/generate-qr.module').then(m => m.GenerateQRPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'profesor-dashboard',
    loadChildren: () => import('./profesor-dashboard/profesor-dashboard.module').then(m => m.ProfesorDashboardPageModule)
  },
  {
    path: 'alumno-dashboard',
    loadChildren: () => import('./alumno-dashboard/alumno-dashboard.module').then(m => m.AlumnoDashboardPageModule)
  },
  {
    path: 'historial-asistencia-alumno',
    loadChildren: () => import('./historial-asistencia-alumno/historial-asistencia-alumno.module').then( m => m.HistorialAsistenciaAlumnoPageModule)
  },
  {
    path: 'historial-asistencia-profesor',
    loadChildren: () => import('./historial-asistencia-profesor/historial-asistencia-profesor.module').then( m => m.HistorialAsistenciaProfesorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
