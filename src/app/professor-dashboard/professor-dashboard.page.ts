import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-professor-dashboard',
  templateUrl: './professor-dashboard.page.html',
  styleUrls: ['./professor-dashboard.page.scss'],
})
export class ProfessorDashboardPage {
  professorName: string = '';

  constructor(private router: Router, private storage: Storage) {}

  async ngOnInit() {
    // Obtén el nombre del profesor desde el almacenamiento
    this.professorName = (await this.storage.get('username')) || 'Profesor';
  }

  // Función para cerrar sesión
  logout() {
    this.storage.clear(); // Limpiar el almacenamiento
    this.router.navigate(['/login']); // Redirigir a la página de login
  }

  // Función para generar el código QR
  generateQR() {
    const qrData = 'Texto que deseas codificar'; // Reemplaza con el dato que deseas codificar
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=150x150`;
    // Abre el código QR en una nueva pestaña
    window.open(qrApiUrl, '_blank');
  }
}
