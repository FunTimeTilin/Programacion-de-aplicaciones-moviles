import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']); // Redirige a la página de inicio o a la ruta deseada
  }
}
