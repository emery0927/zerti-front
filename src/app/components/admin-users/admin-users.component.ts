import { Component } from '@angular/core';

export interface RolXUser {
  id: number;
  rol: string;
  username: string;
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
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {

  displayedColumns: string[] = ['rol', 'username'];
  dataSource = ELEMENT_DATA;
}
