import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateEducationalInstituteComponent } from '../create-educational-institute/create-educational-institute.component';

@Component({
  selector: 'app-educational-institutions-management',
  templateUrl: './educational-institutions-management.component.html',
  styleUrls: ['./educational-institutions-management.component.css'],
})
export class EducationalInstitutionsManagementComponent implements AfterViewInit {

  displayedColumns: string[] = ['ieo', 'shortname', 'code', 'nit', 'location', 'zone', 'class', 'options'];
  data = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;

  constructor(public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
  }

  editar() {}
  eliminar() {}

  abrirCrearIE() {
    const dialogRef = this.dialog.open(CreateEducationalInstituteComponent, {restoreFocus: false});

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());

  }
}

export interface PeriodicElement {
  position: number;
  name: string;
  shortname: string;
  code: string;
  nit: string;
  location: string;
  zone: string;
  class: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: '01 Institución Educativa Liceo Departamental', shortname: 'Liceo Departamental', code: '10001', nit: '800.125.539-1', location: 'Santiago de Cali', zone:'Urbana', class:'Oficial'},
  {position: 2, name: '02 Institución Educativa DE SANTA LIBRADA', shortname: 'Santa Librada - Cali', code: '10002', nit: '800.145.251-0', location: 'Santiago de Cali', zone:'Urbana', class:'Oficial'},
  {position: 3, name: '03 Institución Educativa Técnico Indusatrial ANTONIO JOSÉ CAMACHO', shortname: 'IETI Antonio José Camacho', code: '10003', nit: '805.235.444-7', location: 'Santiago de Cali', zone:'Rural', class:'Oficial'},
  {position: 4, name: '04 Institución Educativa SIMÓN BOLIVAR', shortname: 'Simón Bolivar', code: '10004', nit: '800.145.478-5', location: 'Jamundí', zone:'Rural', class:'No Oficial'},
  {position: 5, name: '05 Institución Educativa GENERAL FRANCISCO DE PAULA SANTANDER', shortname: 'Fco de Paula Santander', code: '10005', nit: '900.478.565-3', location: 'Buenaventura', zone:'Urbana', class:'Oficial'},
  {position: 6, name: '06 Institución Educativa Liceo Departamental', shortname: 'Liceo Departamental', code: '10001', nit: '800.125.539-1', location: 'Santiago de Cali', zone:'Urbana', class:'Oficial'},
  {position: 7, name: '07 Institución Educativa Liceo Departamental', shortname: 'Liceo Departamental', code: '10001', nit: '800.125.539-1', location: 'Santiago de Cali', zone:'Urbana', class:'Oficial'},
  {position: 8, name: '08 Institución Educativa Liceo Departamental', shortname: 'Liceo Departamental', code: '10001', nit: '800.125.539-1', location: 'Santiago de Cali', zone:'Urbana', class:'Oficial'},
  {position: 9, name: '09 Institución Educativa Liceo Departamental', shortname: 'Liceo Departamental', code: '10001', nit: '800.125.539-1', location: 'Santiago de Cali', zone:'Urbana', class:'Oficial'},
  {position: 10, name: '10 Institución Educativa Liceo Departamental', shortname: 'Liceo Departamental', code: '10001', nit: '800.125.539-1', location: 'Santiago de Cali', zone:'Urbana', class:'Oficial'},
];
