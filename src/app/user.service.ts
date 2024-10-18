import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private storage: Storage) {
    this.storage.create(); // Inicializa el almacenamiento
  }

  async register(user: any): Promise<void> {
    const users = await this.storage.get('users') || [];
    users.push(user);
    await this.storage.set('users', users);
  }
}
