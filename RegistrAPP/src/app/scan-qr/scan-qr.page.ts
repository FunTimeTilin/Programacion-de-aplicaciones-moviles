import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BrowserMultiFormatReader } from '@zxing/library';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQRPage implements OnInit {
  qrCode: string = ''; // Variable para almacenar el código QR escaneado
  claseId: number = 0;  // ID de la clase a la que corresponde la asistencia
  claseNombre: string = '';  // Nombre de la clase
  videoInputDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | null = null;
  codeReader: BrowserMultiFormatReader;
  scanning: boolean = false;  // Estado de escaneo, para evitar repeticiones

  constructor(private router: Router, private storage: Storage) {
    this.codeReader = new BrowserMultiFormatReader(); // Inicializamos el escáner
  }

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.queryParams) {
      this.claseId = navigation.extras.queryParams['claseId'];
      this.claseNombre = navigation.extras.queryParams['claseNombre'];
    }

    await this.loadDevices(); // Cargar dispositivos disponibles
  }

  // Cargar los dispositivos de la cámara disponibles
  async loadDevices() {
    const videoInputDevices = await this.codeReader.listVideoInputDevices();
    this.videoInputDevices = videoInputDevices;
    if (this.videoInputDevices.length > 0) {
      this.selectedDevice = this.videoInputDevices[0]; // Seleccionar el primer dispositivo
    }
  }

  // Iniciar el escaneo
  async startScanning() {
    if (!this.selectedDevice || this.scanning) return;  // Verificar si ya estamos escaneando

    this.scanning = true;  // Establecer que estamos escaneando
    const previewElement = document.getElementById('video') as HTMLVideoElement;

    try {
      await this.codeReader.decodeFromVideoDevice(
        this.selectedDevice.deviceId, previewElement, (result, error) => {
          if (result) {
            this.qrCode = result.getText();
            console.log('QR escaneado:', this.qrCode);
            this.registerAttendance(); // Registrar la asistencia
            this.stopScanning();  // Detener el escáner después de un escaneo exitoso
          } else if (error) {
            console.error(error);
          }
        }
      );
    } catch (err) {
      console.error('Error al iniciar el escaneo', err);
    }
  }

  async registerAttendance() {
    const usuarioEmail = await this.storage.get('userEmail');
    if (!usuarioEmail) {
      console.error("No se encontró el email del usuario");
      return;
    }

    const asistencia = {
      claseId: this.claseId,
      estudiante: usuarioEmail,
      estado: 'Presente',
    };

    let asistencias = await this.storage.get('asistencias') || [];
    console.log("Asistencias antes de agregar nueva:", asistencias);

    // Filtramos para eliminar cualquier registro existente para el mismo claseId y usuarioEmail
    asistencias = asistencias.filter((a: any) => !(a.claseId === this.claseId && a.estudiante === usuarioEmail));
    asistencias.push(asistencia);
    
    await this.storage.set('asistencias', asistencias);
    console.log("Asistencias actualizadas después de agregar:", asistencias);

    alert('Asistencia registrada con éxito');
    this.router.navigate(['/alumno-dashboard']);
  }

  // Detener el escáner para evitar más escaneos
  stopScanning() {
    this.codeReader.reset();
    this.scanning = false; // Detener el escaneo
  }

  // Función para cerrar la cámara
  stopScanner() {
    this.codeReader.reset();
  }
}
