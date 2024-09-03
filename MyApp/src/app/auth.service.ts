import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  isLoggedIn = false;

  login(user: any): Observable<boolean> {
    // Aquí realizarías la lógica para autenticar al usuario
    // Por ejemplo, hacer una petición a un servidor
    // y validar las credenciales

    // Simulación de login exitoso
    this.isLoggedIn = true;
    return of(true);
  }

  logout() {
    // Aquí realizarías la lógica para cerrar sesión
    this.isLoggedIn = false;
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }
  

}