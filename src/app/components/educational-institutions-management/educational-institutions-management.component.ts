import { AfterViewInit, Component, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateEducationalInstituteComponent } from '../create-educational-institute/create-educational-institute.component';
import { Subject } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { EditEducationalInstitutionComponent } from '../edit-educational-institution/edit-educational-institution.component';
import Swal from 'sweetalert2';
import { BubblePaginationDirective } from 'src/app/directives/bubble-pagination.directive';


export interface TerritorialEntitiesFilter {
  name:string;
  options:string[];
  defaultValue:string;
}

@Component({
  selector: 'app-educational-institutions-management',
  templateUrl: './educational-institutions-management.component.html',
  styleUrls: ['./educational-institutions-management.component.css'],
  providers: [{ provide: MatPaginatorIntl}],

})
export class EducationalInstitutionsManagementComponent implements AfterViewInit, OnInit {

  territorialEntities: string[]=['Todas', 'Santiago de Cali', 'Valle del Cauca', 'Jamundí'];
  territorialEntitiesFilter: TerritorialEntitiesFilter[]=[];

  displayedColumns: string[] = ['ieo', 'shortname', 'code', 'nit', 'location', 'zone', 'class', 'options'];
  data = new MatTableDataSource<EducationalInstitutions>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;

  @ViewChild(MatSort)
  sort!: MatSort;

  @Input()
  pageIndex!: number;

  defaultValue!: "Todas";

  pageNumberInput!: number;

  totalItems = this.data.data.length;
  itemsPerPage = 1;
  currentPage = 0;

  filterDictionary= new Map<string,string>();

  constructor(public dialog: MatDialog) {}

  /* Metodo encargado de filtrar la información de la tabla */
  applyFilter(event: Event, columnName: string) {
    if (columnName === 'shortname') {
      const filterValue = (event.target as HTMLInputElement).value;
      this.data.filter = filterValue.trim().toLowerCase();

      // Si la tabla tiene paginación, regresa a la primera página al aplicar el filtro
      if (this.data.paginator) {
        this.data.paginator.firstPage();
      }
  }
}

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
    this.territorialEntitiesFilter.push({name:'location',options:this.territorialEntities,defaultValue:this.defaultValue});
  }


  filterByTerritorialEntity(ob:MatSelectChange,territorialEntitiesFilter:TerritorialEntitiesFilter) {
    this.data.filterPredicate = function (record,filter) {
      // sourcery skip: avoid-using-var
            var map = new Map(JSON.parse(filter));
            let isMatch = false;
            for(let [key,value] of map){
              isMatch = (value=="Todas") || (record[key as keyof EducationalInstitutions] == value);
              if (!isMatch) {
                return false;
              }
            }
            return isMatch;
          }

    this.filterDictionary.set(territorialEntitiesFilter.name,ob.value);
// sourcery skip: avoid-using-var
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.data.filter = jsonString;
  }

  editar() {
    const dialogRef = this.dialog.open(EditEducationalInstitutionComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }
  eliminar() {
    Swal.fire({
      title: "Estás seguro?",
      text: "La Institución será eliminada de forma permanente",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#b16448",
      cancelButtonColor: "#d5a14f",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Institución Eliminada",
          text: "La Institución ha sido eliminada satisfactoriamente",
          icon: "success",
          confirmButtonColor: "#b16448"
        });
      }
    });
  }

  abrirCrearIE() {
    const dialogRef = this.dialog.open(CreateEducationalInstituteComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());

  }

  goToPage() {
    this.paginator.pageIndex = this.pageNumberInput - 1;

    // Validar que la página deseada esté dentro del rango válido
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.pageNumberInput == totalPages || this.pageNumberInput <= totalPages) {
      this.currentPage = this.pageNumberInput;
      console.log(this.paginator.page.next({
        pageIndex: this.pageNumberInput - 1,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      }));
    } else {
      this.paginator.pageIndex = totalPages -1
      console.log(
        this.paginator.page.next({
          pageIndex: totalPages - 1,
          pageSize: this.paginator.pageSize,
          length: this.paginator.length
        }));
    }
  }

}

export interface EducationalInstitutions {
  position: number;
  name: string;
  shortname: string;
  code: string;
  nit: string;
  location: string;
  zone: string;
  class: string;
}

const ELEMENT_DATA: EducationalInstitutions[] = [
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
