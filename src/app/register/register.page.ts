import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  showPassword: boolean = false; // Propiedad para mostrar u ocultar la contraseña

  constructor(private formBuilder: FormBuilder, private storage: Storage) {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Inicializa el almacenamiento (necesario para usar Ionic Storage)
    this.storage.create();
  }

  register() {
    // Aquí guardarías el usuario en la base de datos
    const userData = this.registerForm.value;
    // Guardar en la base de datos
    this.storage.set(userData.username, userData).then(() => {
      console.log('Usuario registrado:', userData);
      // Redireccionar al login después de registrar
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword; // Alterna el estado de mostrar/ocultar contraseña
  }
}
