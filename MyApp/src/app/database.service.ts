import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private sqlite: SQLite) {}

  public createDatabase() {
    this.sqlite
      .create({
        name: 'data.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        db.executeSql(
          'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name TEXT, email TEXT)',
          []
        )
          .then(() => console.log('Tabla creada'))
          .catch((e) => console.log('Error al crear tabla', e));
      })
      .catch((e) => console.log('Error al crear base de datos', e));
  }
}

