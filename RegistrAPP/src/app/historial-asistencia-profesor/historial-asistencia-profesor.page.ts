import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-historial-asistencia-profesor',
  templateUrl: './historial-asistencia-profesor.page.html',
  styleUrls: ['./historial-asistencia-profesor.page.scss'],
})
export class HistorialAsistenciaProfesorPage implements OnInit {
  claseId: number = 0;
  claseFecha: string = '';
  historial: any[] = [];

  constructor(private router: Router, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    
    // Intentamos obtener el claseId desde el localStorage
    this.claseId = parseInt(localStorage.getItem('claseId') || '0', 10);
    
    if (!this.claseId) {
      console.error('No se proporcionó claseId');
      this.router.navigate(['/profesor-dashboard']);
      return;
    }

    console.log('Ver historial de asistencia para:', this.claseId);
    this.loadHistorial();
  }

  // Función para cargar el historial de asistencia
  async loadHistorial() {
    const asistencias = await this.storage.get('asistencias') || [];
    const historialClase = asistencias.filter(
      (asistencia: any) => asistencia.claseId === this.claseId
    );

    if (historialClase.length === 0) {
      this.historial = [{ nombre: 'No hay alumnos presentes en esta clase' }];
    } else {
      this.historial = historialClase.map((asistencia: any) => ({
        nombre: asistencia.estudiante,
        estado: asistencia.estado,
      }));
    }

    const clasesProgramadas = await this.storage.get('clasesProgramadas') || [];
    const clase = clasesProgramadas.find((clase: any) => clase.id === this.claseId);
    if (clase) {
      this.claseFecha = clase.fecha;
    }
  }
}
