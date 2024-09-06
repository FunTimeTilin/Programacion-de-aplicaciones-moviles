import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    // Simula el estado de autenticación; aquí deberías verificar el estado real
    const token = localStorage.getItem('authToken'); // O el método que uses para verificar autenticación
    this.isAuthenticatedSubject.next(!!token);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(user: { username: string; password: string }): Observable<boolean> {
    // Lógica para el inicio de sesión, y actualización del estado de autenticación
    // Ejemplo de simulación
    if (user.username === 'user' && user.password === 'password') {
      localStorage.setItem('authToken', 'dummy-token'); // Guarda el token de autenticación
      this.isAuthenticatedSubject.next(true);
      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): Observable<void> {
    // Lógica para cerrar sesión
    localStorage.removeItem('authToken'); // Elimina el token de autenticación
    this.isAuthenticatedSubject.next(false);
    return of(void 0);
  }
  register(user: { rut: string; name: string; email: string; password: string }): Observable<boolean> {
    // Lógica para el registro, y actualización del estado de autenticación si es necesario
    // Aquí solo simulamos un registro exitoso
    console.log('Usuario registrado', user);
    return of(true); // Cambia esto según la lógica real del registro
  }
}
