import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.page.html',
  styleUrls: ['./student-dashboard.page.scss'],
})
export class StudentDashboardPage implements OnInit {
  user: any; // Aquí guardaremos los datos del usuario

  constructor(private storage: Storage, private router: Router) {}

  ngOnInit() {
    this.storage.get('nombre_usuario').then((user) => {
      this.user = user;
    });
  }

  logout() {
    // Lógica para cerrar sesión
    this.router.navigate(['/login']); // Redirige al login
  }

  generateQRCode() {
    // Aquí puedes agregar la lógica para generar el QR.
    console.log('Generando código QR...');
    // Esta es solo una demostración; puedes integrar la API de QR aquí más adelante.
  }
}
