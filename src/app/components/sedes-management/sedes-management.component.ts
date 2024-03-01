import { Component } from '@angular/core';

export interface Sedes {
  id: number;
  orden: string;
  nombre: string;
}

export interface TerritorialEntitiesFilter {
  name:string;
  options:string[];
  defaultValue:string;
}

const ELEMENT_DATA: Sedes[] = [
  {id: 1, orden: '01', nombre: 'Sede Principal'},
  {id: 2, orden: '02', nombre: 'La Santa María'},
  {id: 3, orden: '03', nombre: 'El Almendro'},
  {id: 4, orden: '04', nombre: 'Jose María Sandoval Zapata'},
  {id: 5, orden: '05', nombre: 'Gran Colombia'},
  {id: 6, orden: '06', nombre: 'La Presentación'},
];

@Component({
  selector: 'app-sedes-management',
  templateUrl: './sedes-management.component.html',
  styleUrls: ['./sedes-management.component.css']
})
export class SedesManagementComponent {
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
    displayedColumns: string[] = ['orden','nombre', 'options'];
    dataSource = ELEMENT_DATA;
  }
