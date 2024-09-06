import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = { rut: '', name: '', email: '', password: '' };
  showPassword = false; // Propiedad para controlar la visibilidad de la contraseña

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.user).subscribe(
      (res) => {
        if (res) {
          console.log('Registro exitoso');
          this.router.navigate(['/login']); // Redirigir al login o a donde necesites
        } else {
          console.log('Error al registrar');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
