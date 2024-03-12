import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CreateStudentUserComponent } from '../create-student-user/create-student-user.component';
import { EditEducationalInstitutionComponent } from '../edit-educational-institution/edit-educational-institution.component';
import { TerritorialEntitiesFilter } from '../educational-institutions-management/educational-institutions-management.component';
import { FormularioCreacionEquiposComponent } from '../formulario-creacion-equipos/formulario-creacion-equipos.component';
import { FormularioEdicionEquiposComponent } from '../formulario-edicion-equipos/formulario-edicion-equipos.component';

@Component({
  selector: 'app-equipos-servicio-creacion',
  templateUrl: './equipos-servicio-creacion.component.html',
  styleUrls: ['./equipos-servicio-creacion.component.css']
})
export class EquiposServicioCreacionComponent implements AfterViewInit, OnInit {

  territorialEntities: string[]=['Todas', 'Santiago de Cali', 'Valle del Cauca', 'Jamundí'];
  territorialEntitiesFilter: TerritorialEntitiesFilter[]=[];

  displayedColumns: string[] = ['nombre_equipo', 'nombre_administrador', 'codigo', 'options'];
  data = new MatTableDataSource<EquipoServicio>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;

  @ViewChild('inputField') inputField: any;

  @ViewChild(MatSort)
  sort!: MatSort;

  @Input()
  pageIndex!: number;

  muestraFormularioCreacion: boolean = false;
  muestraFormularioEdicion: boolean = false;

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

mostrarFormularioCreacion() {
  this.muestraFormularioCreacion =!this.muestraFormularioCreacion;
}

mostrarFormularioEdicion() {
  this.muestraFormularioEdicion =!this.muestraFormularioEdicion;
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

  abrirCrearEquipo() {
    const dialogRef = this.dialog.open(FormularioCreacionEquiposComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());

  }

  abrirEditarEquipo() {
    const dialogRef = this.dialog.open(FormularioEdicionEquiposComponent, {restoreFocus: false});
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

export interface EquipoServicio {
  nombre_equipo: string;
  nombre_administrador: string;
  codigo: string;
}

const ELEMENT_DATA: EquipoServicio[] = [
  {nombre_equipo: 'Equipo de Servicios 1', nombre_administrador: 'Pedro Pablo Castillo Lopera' , codigo: '300'},
  {nombre_equipo: 'Equipo de Servicios 2', nombre_administrador: 'José Manuel Higuera' , codigo: '185'},
  {nombre_equipo: 'Equipo de Servicios 3', nombre_administrador: 'Albeiro de Jesús Lopera' , codigo: '177'},
  {nombre_equipo: 'Equipo de Servicios 4', nombre_administrador: 'Ana María Castellanos' , codigo: '213'},
  {nombre_equipo: 'Equipo de Servicios 5', nombre_administrador: 'Ana María Castellanos' , codigo: '276'},
  {nombre_equipo: 'Equipo de Servicios 6', nombre_administrador: 'Luis Osvaldo Zapata Rosero' , codigo: '211'},
  {nombre_equipo: 'Equipo de Servicios 7', nombre_administrador: 'María de Los Angeles Rios Plata' , codigo: '163'}
 ];
