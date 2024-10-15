import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private dbService: DatabaseService) {this.initializeApp();}

  goBack() {
    this.router.navigate(['/']); // Redirige a la página de inicio o a la ruta deseada
    
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.dbService.createDatabase(); // Crea la base de datos cuando la app esté lista
    }
}
