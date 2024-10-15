import { Component } from '@angular/core';
import { SQLiteService } from './srv-sqllite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private sqliteService: SQLiteService) {
    this.initializeDatabase();

}

async initializeDatabase() {
  try {
    await this.sqliteService.openDatabase();
    await this.sqliteService.createTables();
    console.log('Base de datos inicializada');
  } catch (error) {
    console.error('Error al inicializar la base de datos', error);
  }
}