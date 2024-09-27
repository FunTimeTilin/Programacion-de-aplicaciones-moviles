import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  email: string = '';

  constructor() {}

  onResetPassword() {
    // Aquí va la lógica para enviar el correo de restablecimiento de contraseña
    console.log('Solicitud de restablecimiento enviada para:', this.email);
  }
}
