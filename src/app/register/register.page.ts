import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private storage: Storage, 
    private router: Router 
  ) {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.storage.create();
  }

  register() {
    const userData = this.registerForm.value;
    this.storage.set(userData.username, userData).then(() => {
        console.log('Usuario registrado:', userData);
        this.router.navigate(['/login']);
    }).catch(error => {
        console.error('Error al guardar el usuario:', error);
    });
}


  // Método para limpiar la base de datos
  clearDatabase() {
    this.storage.clear().then(() => {
      console.log('Base de datos limpiada.');
    }).catch(error => {
      console.error('Error al limpiar la base de datos:', error);
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
