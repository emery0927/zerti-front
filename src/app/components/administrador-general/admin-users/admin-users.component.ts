import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

export interface RolXUser {
  id: number;
  rol: string;
  username: string;
}

export interface TerritorialEntitiesFilter {
  name:string;
  options:string[];
  defaultValue:string;
}

const ELEMENT_DATA: RolXUser[] = [
  {id: 1, rol: 'Rectoría:', username: 'Carlos Pastrana'},
  {id: 2, rol: 'Pagaduría:', username: 'Carlos Pastrana'},
  {id: 3, rol: 'Secretaría Académica:', username: 'Carlos Pastrana'},
  {id: 4, rol: 'Auxiliar Rectoría:', username: 'Carlos Pastrana'},
  {id: 5, rol: 'Auxiliar Pagaduría:', username: 'Carlos Pastrana'},
  {id: 6, rol: 'Auxiliar Secretaria:', username: 'Carlos Pastrana'},
];

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatTableModule, NgClass, MatIconModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
eliminar() {
throw new Error('Method not implemented.');
}
editar() {
throw new Error('Method not implemented.');
}
showOnCustody() {
throw new Error('Method not implemented.');
}
showIdle() {
throw new Error('Method not implemented.');
}
abrirCrearIE() {
throw new Error('Method not implemented.');
}
showOficials() {
throw new Error('Method not implemented.');
}

  territorialEntities: string[]=['Todas', 'Santiago de Cali', 'Valle del Cauca', 'Jamundí'];
  territorialEntitiesFilter: TerritorialEntitiesFilter[]=[];
  displayedColumns: string[] = ['rol', 'username', 'options'];
  dataSource = ELEMENT_DATA;
}
