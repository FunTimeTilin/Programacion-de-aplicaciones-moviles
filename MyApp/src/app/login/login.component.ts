import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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

  onSubmit(): void {
    this.authService.login(this.user).subscribe(
      (res) => {
        if (res) {
          console.log('Login exitoso');
          this.router.navigate(['/home']); // Redirigir a la página de inicio
        } else {
          console.log('Credenciales inválidas');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}