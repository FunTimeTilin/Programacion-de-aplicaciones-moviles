import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-historial-asistencia-alumno',
  templateUrl: './historial-asistencia-alumno.page.html',
  styleUrls: ['./historial-asistencia-alumno.page.scss'],
})
export class HistorialAsistenciaAlumnoPage implements OnInit {
  claseId: number = 0; // ID de la clase
  claseFecha: string = ''; // Fecha de la clase
  historial: any[] = []; // Historial de asistencia

  constructor(
    private router: Router,
    private route: ActivatedRoute, // Para acceder a los queryParams
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.initializeStorage();

    // Obtener el parámetro 'claseId' desde los queryParams
    this.route.queryParams.subscribe((params) => {
      if (params && params['claseId']) {
        this.claseId = params['claseId'];
        this.loadHistorial(); // Llama la función para cargar el historial
      } else {
        console.error('No se proporcionó claseId');
        this.router.navigate(['/alumno-dashboard']);
      }
    });

    // Asignar la fecha actual en formato deseado
    this.claseFecha = this.getCurrentDate();
  }

  async initializeStorage() {
    await this.storage.create();

    // Verificar si el usuario está logueado
    const loggedIn = await this.storage.get('loggedIn');
    if (!loggedIn) {
      this.router.navigate(['/login']);
    }
  }

  // Obtener la fecha actual en formato 'dd/mm/yyyy'
  getCurrentDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Cargar los datos del historial para el alumno
  async loadHistorial() {
    try {
        const asistencias = (await this.storage.get('asistencias')) || [];
        console.log('Asistencias guardadas:', asistencias);

        const usuarioEmail = (await this.storage.get('userEmail'))?.trim();
        if (!usuarioEmail) {
            console.error("No se encontró el email del usuario");
            return;
        }

        console.log("Filtrando asistencias para claseId:", this.claseId, "y usuarioEmail:", usuarioEmail);

        const historialClase = asistencias.filter((asistencia: any) => {
            const claseIdMatch = String(asistencia.claseId) === String(this.claseId);
            const emailMatch = asistencia.estudiante.trim() === usuarioEmail;
            console.log(`Comparando claseId: asistencia.claseId=${asistencia.claseId} (${typeof asistencia.claseId}) con this.claseId=${this.claseId} (${typeof this.claseId}) -> ${claseIdMatch}`);
            console.log(`Comparando estudiante: asistencia.estudiante=${asistencia.estudiante.trim()} con usuarioEmail=${usuarioEmail} -> ${emailMatch}`);
            return claseIdMatch && emailMatch;
        });

        if (historialClase.length > 0) {
            this.historial = historialClase.map((asistencia: any) => ({
                nombre: asistencia.estudiante,
                estado: asistencia.estado
            }));
            console.log('Asistencia encontrada para el alumno:', this.historial);
        } else {
            this.historial = [{ nombre: 'No hay registro de asistencia para este alumno', estado: 'Ausente' }];
            console.log('No se encontró asistencia para el alumno, mostrando como ausente.');
        }
    } catch (error) {
        console.error("Error al cargar el historial:", error);
    }
  }
}
