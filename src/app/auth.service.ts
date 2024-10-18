import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto asegura que AuthService esté disponible en toda la aplicación
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private usernameSubject = new BehaviorSubject<string | null>(null);
  public username$ = this.usernameSubject.asObservable();

  constructor() {
    // Inicialización si es necesaria
  }

  login(username: string): void {
    this.isAuthenticatedSubject.next(true);
    this.usernameSubject.next(username);
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.usernameSubject.next(null);
  }
  
}
