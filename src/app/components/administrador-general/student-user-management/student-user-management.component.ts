import { AfterViewInit, Component, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CreateEducationalInstituteComponent } from '../create-educational-institute/create-educational-institute.component';
import { Subject } from 'rxjs';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { EditEducationalInstitutionComponent } from '../edit-educational-institution/edit-educational-institution.component';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateStudentUserComponent } from '../create-student-user/create-student-user.component';
import { BubblePaginationDirective } from 'src/app/directives/bubble-pagination.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

export interface TerritorialEntitiesFilter {
  name:string;
  options:string[];
  defaultValue:string;
}

@Component({
  selector: 'app-student-user-management',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatIconModule, MatPaginatorModule,
    MatTableModule, MatMenuModule, FormsModule, BubblePaginationDirective, CommonModule, MatButtonModule,
  MatInputModule],
  templateUrl: './student-user-management.component.html',
  styleUrls: ['./student-user-management.component.css']
})
export class StudentUserManagementComponent implements AfterViewInit, OnInit {

  territorialEntities: string[]=['Todas', 'Santiago de Cali', 'Valle del Cauca', 'Jamundí'];
  territorialEntitiesFilter: TerritorialEntitiesFilter[]=[];

  displayedColumns: string[] = ['fullname', 'document', 'code', 'site', 'school_day', 'grade', 'status', 'email', 'options'];
  data = new MatTableDataSource<StudentsUsers>(ELEMENT_DATA);

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

  totalItems = 2;
  itemsPerPage = 1;
  currentPage = 0;

  filterDictionary= new Map<string,string>();

  constructor(public dialog: MatDialog, private spinner: NgxSpinnerService) {}

  /* Metodo encargado de filtrar la información de la tabla */
  applyFilter(event: Event, columnName: string) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.data.filter = filterValue.trim().toLowerCase();

      // Si la tabla tiene paginación, regresa a la primera página al aplicar el filtro
      if (this.data.paginator) {
        this.data.paginator.firstPage();
      }
  }

mostrarLoader(): void {
  this.spinner.show();

  // Simula una acción asincrónica (por ejemplo, una solicitud HTTP)
  setTimeout(() => {
    // Después de completar la acción, oculta el loader
    this.spinner.hide();
  }, 500); // Cambia este valor según tus necesidades
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
              isMatch = (value=="Todas") || (record[key as keyof StudentsUsers] == value);
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
    const dialogRef = this.dialog.open(CreateStudentUserComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());

  }

  goToPage() {
    this.paginator.pageIndex = this.pageNumberInput - 1;

    // Validar que la página deseada esté dentro del rango válido
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.pageNumberInput == totalPages || this.pageNumberInput <= totalPages) {
      this.currentPage = this.pageNumberInput;
      this.paginator.page.next({
        pageIndex: this.pageNumberInput - 1,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
    } else {
      this.paginator.pageIndex = totalPages -1
        this.paginator.page.next({
          pageIndex: totalPages -1,
          pageSize: this.paginator.pageSize,
          length: this.paginator.length
        });
    }
  }

}

export interface StudentsUsers {
  id: number;
  full_name: string;
  document: string;
  code: string;
  site: string;
  school_day: string;
  grade: string;
  status: string;
  email: string;
}

const ELEMENT_DATA: StudentsUsers[] = [
  {id: 1, full_name: 'Abadia Arce Santiago', document: '1105379250', code: '107533',
  site: 'La Gran Colombia', school_day: 'Tarde', grade:'7', status:'7-2', email:'abasan23@hotmail.com',},
  {id: 2, full_name: 'Acevedo Padilla Valentina', document: '1006168805', code: '107290',
  site: 'Liceo Departamental', school_day: 'Mañana', grade:'10', status:'10-1', email:'valen093@gmail.com'},
 ];

