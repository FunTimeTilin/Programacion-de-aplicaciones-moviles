import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import QRious from 'qrious';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.page.html',
  styleUrls: ['./generate-qr.page.scss'],
})
export class GenerateQRPage implements OnInit {
  @ViewChild('qrCanvas', { static: true }) qrCanvas!: ElementRef;
  qrData: string = ''; // Variable para almacenar la URL del QR
  claseId: string = ''; // ID de la clase

  constructor(
    private router: Router,
    private storage: Storage,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    // Obtenemos el ID de la clase de los parámetros de la URL o almacenamiento
    const navigationExtras = this.router.getCurrentNavigation()?.extras.queryParams;
    if (navigationExtras && navigationExtras['claseId']) {
      this.claseId = navigationExtras['claseId'];
      // Aquí establecemos el valor del QR con el ID de la clase
      this.qrData = `https://tu-sistema.com/registro_asistencia?id_clase=${this.claseId}`;
      this.generateQRCode();
    } else {
      console.error('No se encontró claseId en los parámetros');
    }
  }

  // Crear el código QR
  generateQRCode() {
    const qr = new QRious({
      element: this.qrCanvas.nativeElement,
      value: this.qrData, // Establecemos la URL con el id de la clase
      size: 256,
    });
  }

  // Función para guardar la asistencia
  async saveAttendance() {
    const alumnoEmail = await this.storage.get('userEmail');
    const asistencia = {
      claseId: this.claseId,
      estudiante: alumnoEmail,
      estado: 'Presente',
    };

    // Guardamos la asistencia en el almacenamiento
    const asistencias = await this.storage.get('asistencias') || [];
    asistencias.push(asistencia);
    await this.storage.set('asistencias', asistencias);

    // Mostrar alerta de que la asistencia fue registrada
    await this.showAttendanceAlert();

    // Redirigir al Dashboard del profesor después de guardar la asistencia
    this.router.navigate(['/profesor-dashboard']);
  }

  // Función para mostrar la alerta de "Asistencia registrada"
  async showAttendanceAlert() {
    const alert = await this.alertController.create({
      header: 'Asistencia Registrada',
      message: 'Tu asistencia ha sido registrada correctamente.',
      buttons: ['OK'],
    });

    await alert.present(); // Mostrar la alerta
  }
}
