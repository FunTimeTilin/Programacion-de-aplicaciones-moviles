import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false; // Asegúrate de que esta propiedad esté definida

  constructor(private formBuilder: FormBuilder, private router: Router, private storage: Storage) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    const { username, password } = this.loginForm.value;

    // Recupera los datos del usuario
    this.storage.get(username).then(userData => {
        console.log('Datos recuperados:', userData);

        if (userData && userData.password === password) {
            console.log('Credenciales correctas');
            // Redirige al dashboard
            this.router.navigate(['/dashboard']);
        } else {
            console.error('Credenciales incorrectas');
        }
    }).catch(error => {
        console.error('Error al recuperar los datos:', error);
    });
}

  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Alternar la visibilidad de la contraseña
  }
}
