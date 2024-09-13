import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user = { username: '', password: '' };
  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      // Lógica de autenticación aquí
      console.log('Formulario válido. Enviando datos...');
      this.router.navigate(['/home']);  // Redirigir al home si el login es exitoso
    } else {
      console.log('Formulario no válido');
    }
  }
}