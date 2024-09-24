import { Component, ViewChild } from '@angular/core';
import { EditarSedeComponent } from '../editar-sede/editar-sede.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import Swal from 'sweetalert2';
import { CrearSedeComponent } from '../crear-sede/crear-sede.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

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
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatTableModule, NgClass, MatMenuModule, MatIconModule],
  templateUrl: './sedes-management.component.html',
  styleUrls: ['./sedes-management.component.css']
})
export class SedesManagementComponent {

  constructor(public dialog: MatDialog) {

  }

  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;
  eliminar() {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "La sede será eliminada de forma permanente",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#b16448",
      cancelButtonColor: "#d5a14f",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sede Eliminada",
          text: "La sede ha sido eliminada satisfactoriamente",
          icon: "success",
          confirmButtonColor: "#b16448"
        });
      }
    });
  }
  editar() {
    const dialogRef = this.dialog.open(EditarSedeComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  abrirCrearSede() {
    const dialogRef = this.dialog.open(CrearSedeComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
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
