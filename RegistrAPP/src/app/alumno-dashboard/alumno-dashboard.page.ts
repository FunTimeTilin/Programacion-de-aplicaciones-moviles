import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-alumno-dashboard',
  templateUrl: './alumno-dashboard.page.html',
  styleUrls: ['./alumno-dashboard.page.scss'],
})
export class AlumnoDashboardPage implements OnInit {
  alumnoName: string = '';  // Nombre del alumno
  clase: any = {};  // Clase única
  currentDate: string = '';  // Fecha actual
  currentTime: string = '';  // Hora actual

  constructor(private storage: Storage, private router: Router) {}

  async ngOnInit() {
    await this.storage.create();
    const loggedIn = await this.storage.get('loggedIn');
    const email = await this.storage.get('userEmail'); // Obtener el correo del alumno

    if (!loggedIn || !email) {
      this.router.navigate(['/login']);
    } else {
      this.alumnoName = this.getAlumnoName(email);  // Asignar el nombre del alumno
      this.setCurrentDate();  // Establecer la fecha
      this.setCurrentTime();  // Establecer la hora
      this.loadClase();  // Cargar la clase única
    }

    // Actualizar la hora cada segundo
    setInterval(() => {
      this.setCurrentTime();
    }, 1000); // Actualizar cada 1 segundo
  }

  getAlumnoName(email: string): string {
    const nombreAlumno = email.split('@')[0];
    return nombreAlumno.charAt(0).toUpperCase() + nombreAlumno.slice(1);
  }

  setCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    this.currentDate = `${day}/${month}/${year}`;
  }

  setCurrentTime() {
    const currentTime = new Date();
    this.currentTime = currentTime.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  // Cargar clase con fecha actual
  async loadClase() {
    const claseGuardada = await this.storage.get('clase');
    if (!claseGuardada || claseGuardada.fecha !== this.currentDate) {
      this.clase = {
        id: 1,
        nombre: 'Matemáticas 101',
        fecha: this.currentDate,
        estudiantes: [],
      };
      await this.storage.set('clase', this.clase);  // Guardar clase
    } else {
      this.clase = claseGuardada;  // Cargar clase si ya está guardada
    }
  }

  // Función para redirigir al escáner de QR para registrar asistencia
  async scanQRCode() {
    // Redirigir al escáner de QR pasando el ID de la clase
    this.router.navigate(['/scan-qr'], {
      queryParams: { claseId: this.clase.id, claseNombre: this.clase.nombre },
    });
  }

  // Función para redirigir al historial de asistencia
  verHistorial() {
    this.router.navigate(['/historial-asistencia-alumno'], { queryParams: { claseId: this.clase.id } });
  }

  // Cerrar sesión
  async logout() {
    await this.storage.remove('loggedIn');
    await this.storage.remove('role');
    await this.storage.remove('userEmail');
    this.router.navigate(['/login']);
  }

  async mostrarStorage() {
    const storageData = await this.storage.get('loggedIn');
    console.log('LoggedIn:', storageData);
    
    const userEmail = await this.storage.get('userEmail');
    console.log('User Email:', userEmail);
  
    const clasesProgramadas = await this.storage.get('clasesProgramadas');
    console.log('Clases Programadas:', clasesProgramadas);
  
    const asistencias = await this.storage.get('asistencias');
    console.log('Asistencias:', asistencias);
  }

  
  
}
