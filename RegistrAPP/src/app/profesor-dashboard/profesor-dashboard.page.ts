// profesor-dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profesor-dashboard',
  templateUrl: './profesor-dashboard.page.html',
  styleUrls: ['./profesor-dashboard.page.scss'],
})
export class ProfesorDashboardPage implements OnInit {
  profesorName: string = '';  // Nombre del profesor
  clase: any = {};  // Clase única
  currentDate: string = '';  // Fecha actual
  currentTime: string = '';  // Hora actual

  constructor(private router: Router, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    const loggedIn = await this.storage.get('loggedIn');
    const email = await this.storage.get('userEmail'); // Obtener el correo del profesor


    if (!loggedIn || !email) {
      this.router.navigate(['/login']);
    } else {
      this.profesorName = this.getProfesorName(email);  // Asignar el nombre del profesor
      this.setCurrentDate();  // Establecer la fecha
      this.setCurrentTime();  // Establecer la hora
      this.loadClase();  // Cargar la clase única
    }

    // Imprimir los datos del Storage en la consola
  this.printStorageData();

    
    // Actualizar la hora cada segundo
    setInterval(() => {
      this.setCurrentTime();
    }, 1000); // Actualizar cada 1 segundo
  }

  // Obtener el nombre del profesor basado en su correo
  getProfesorName(email: string): string {
    const nombreProfesor = email.split('@')[0];
    return nombreProfesor.charAt(0).toUpperCase() + nombreProfesor.slice(1);
  }

  // Establecer la fecha actual en formato DD/MM/YYYY
  setCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    this.currentDate = `${day}/${month}/${year}`;
  }

  // Establecer la hora en movimiento
  setCurrentTime() {
    const currentTime = new Date();
    this.currentTime = currentTime.toLocaleTimeString('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  // Cargar la clase actual
  async loadClase() {
    const clasesProgramadas = await this.storage.get('clasesProgramadas') || [];
    const clase = clasesProgramadas.find((clase: any) => clase.fecha === this.currentDate);
    if (clase) {
      this.clase = clase;
    } else {
      this.clase = {
        id: 1,
        nombre: 'Matemáticas 101',
        fecha: this.currentDate,
        estudiantes: [], // Lista de estudiantes presentes
      };
    }
  }
  async printStorageData() {
    const loggedIn = await this.storage.get('loggedIn');
    const email = await this.storage.get('userEmail');
    const clasesProgramadas = await this.storage.get('clasesProgramadas');
    const asistencias = await this.storage.get('asistencias');
  
    // Imprimir todos los datos
    console.log('Logged In:', loggedIn);
    console.log('User Email:', email);
    console.log('Clases Programadas:', clasesProgramadas);
    console.log('Asistencias Registradas:', asistencias);
  }

  // Redirigir al generador de QR
  iniciarAsistencia() {
    this.router.navigate(['/generate-qr'], { queryParams: { claseId: this.clase.id } });
  }

  verHistorial(clase: any) {
    console.log('Ver historial de asistencia para:', clase.nombre);
    // Guardamos el ID de la clase en el almacenamiento local
    localStorage.setItem('claseId', clase.id.toString());
    this.router.navigate(['/historial-asistencia-profesor']);
  }
  
  // Cerrar sesión
  async logout() {
    await this.storage.remove('loggedIn');
    await this.storage.remove('userEmail');
    this.router.navigate(['/login']);
  }

  
}
