import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();  // Inicializamos el Storage
    const loggedIn = await this.storage.get('loggedIn');
    if (loggedIn) {
      const role = await this.storage.get('role');
      if (role === 'alumno') {
        this.router.navigate(['/alumno-dashboard']);
      } else if (role === 'profesor') {
        this.router.navigate(['/profesor-dashboard']);
      }
    }
  }

  // Función para manejar el submit del formulario
  async onSubmit() {
    if (this.email === 'so.alfaro@duocuc.cl' && this.password === '1234') {
      await this.storage.set('role', 'alumno');
      await this.storage.set('loggedIn', true);  // Guardamos el estado como 'logueado'
      await this.storage.set('userEmail', this.email);  // Guardamos el email
      this.router.navigate(['/alumno-dashboard']);
    } else if (this.email === 'al.pimiento@profesor.duoc.cl' && this.password === '12345') {
      await this.storage.set('role', 'profesor');
      await this.storage.set('loggedIn', true);  // Guardamos el estado como 'logueado'
      await this.storage.set('userEmail', this.email);  // Guardamos el email
      this.router.navigate(['/profesor-dashboard']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
