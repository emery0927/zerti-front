import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CreateStudentUserComponent } from '../create-student-user/create-student-user.component';
import { EditEducationalInstitutionComponent } from '../edit-educational-institution/edit-educational-institution.component';
import { TerritorialEntitiesFilter } from '../educational-institutions-management/educational-institutions-management.component';
import { FormularioCreacionEntidadesComponent } from '../formulario-creacion-entidades/formulario-creacion-entidades.component';
import { FormularioEdicionEntidadesComponent } from '../formulario-edicion-entidades/formulario-edicion-entidades.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entidades-territoriales',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatMenuModule, MatCardModule, MatFormFieldModule, MatSelectModule, CommonModule],
  templateUrl: './entidades-territoriales.component.html',
  styleUrls: ['./entidades-territoriales.component.css']
})
export class EntidadesTerritorialesComponent implements AfterViewInit, OnInit {

  territorialEntities: string[]=['Todas', 'Santiago de Cali', 'Valle del Cauca', 'Jamundí'];
  territorialEntitiesFilter: TerritorialEntitiesFilter[]=[];

  displayedColumns: string[] = ['nombre', 'codigo', 'options'];
  data = new MatTableDataSource<EntidadTerritorial>(ELEMENT_DATA);

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

  abrirCrearEntidad() {
    const dialogRef = this.dialog.open(FormularioCreacionEntidadesComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());

  }

  abrirEdicionEntidad() {
    const dialogRef = this.dialog.open(FormularioEdicionEntidadesComponent, {restoreFocus: false});
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

export interface EntidadTerritorial {
  nombre: string;
  codigo: string;
  id_departamento: number;
  id_municipio: number;
}

const ELEMENT_DATA: EntidadTerritorial[] = [
  {nombre: 'Cauca', codigo: '533', id_departamento: 1, id_municipio: 0},
  {nombre: 'Popayán', codigo: '35', id_departamento: 1, id_municipio: 1},
  {nombre: 'Risaralda', codigo: '69', id_departamento: 2, id_municipio: 0},
  {nombre: 'Dosquebradas', codigo: '20', id_departamento: 2, id_municipio: 2},
  {nombre: 'Pereira', codigo: '67', id_departamento: 2, id_municipio: 3},
  {nombre: 'Tolima', codigo: '211', id_departamento: 3, id_municipio: 0},
  {nombre: 'Ibagué', codigo: '56', id_departamento: 3, id_municipio: 4},
  {nombre: 'Valle del Cauca', codigo: '163', id_departamento: 4, id_municipio: 0},
  {nombre: 'Buenaventura', codigo: '40', id_departamento: 4, id_municipio: 5},
  {nombre: 'Buga', codigo: '14', id_departamento: 4, id_municipio: 6},
  {nombre: 'Cali', codigo: '92', id_departamento: 4, id_municipio: 7},
  {nombre: 'Cartago', codigo: '12', id_departamento: 4, id_municipio: 8},
  {nombre: 'Jamundí', codigo: '17', id_departamento: 4, id_municipio: 9},
  {nombre: 'Palmira', codigo: '27', id_departamento: 4, id_municipio: 10},
  {nombre: 'Tuluá', codigo: '18', id_departamento: 4, id_municipio: 11},
  {nombre: 'Yumbo', codigo: '13', id_departamento: 4, id_municipio: 12},
 ];
