import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CreateStudentUserComponent } from '../create-student-user/create-student-user.component';
import { EditEducationalInstitutionComponent } from '../edit-educational-institution/edit-educational-institution.component';
import { TerritorialEntitiesFilter } from '../educational-institutions-management/educational-institutions-management.component';

@Component({
  selector: 'app-editar-sede',
  templateUrl: './editar-sede.component.html',
  styleUrls: ['./editar-sede.component.css']
})
export class EditarSedeComponent implements AfterViewInit, OnInit {

  territorialEntities: string[]=['Todas', 'Santiago de Cali', 'Valle del Cauca', 'Jamundí'];
  territorialEntitiesFilter: TerritorialEntitiesFilter[]=[];

  displayedColumns: string[] = ['fullname', 'document', 'code', 'site', 'school_day', 'grade', 'status', 'email', 'options'];
  data = new MatTableDataSource<StudentsUsers>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;

  @ViewChild('inputField') inputField: any;

  @ViewChild(MatSort)
  sort!: MatSort;

  @Input()
  pageIndex!: number;

  showFormField: boolean = false;

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

addFilter() {
  this.showFormField = !this.showFormField;
  if (this.showFormField) {
    setTimeout(() => {
      this.inputField.nativeElement.focus();
    }, 0);
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
