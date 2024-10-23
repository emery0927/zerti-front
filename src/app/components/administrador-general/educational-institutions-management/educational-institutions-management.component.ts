import { AfterViewInit, Component, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CreateEducationalInstituteComponent } from '../create-educational-institute/create-educational-institute.component';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { EditEducationalInstitutionComponent } from '../edit-educational-institution/edit-educational-institution.component';
import Swal from 'sweetalert2';
import { InstitucionEducativa } from 'src/app/models/instititucion-educativa';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { EntidadTerritorial } from 'src/app/models/entidad-territorial';
import { Sede } from 'src/app/models/sede';
import { EditarSedeComponent } from '../editar-sede/editar-sede.component';
import { CrearSedeComponent } from '../crear-sede/crear-sede.component';
import { Municipio } from 'src/app/models/municipio';
import { EquipoServicio } from 'src/app/models/equipo-servicio';
import { Departamento } from 'src/app/models/departamento';
import { CentroPoblado } from 'src/app/models/centro-poblado';
import { ClaseInstitucion } from 'src/app/models/clase-institucion';
import { ModalidadEducativa } from 'src/app/models/modalidad';
import { Subject } from 'rxjs/internal/Subject';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BubblePaginationDirective } from 'src/app/directives/bubble-pagination.directive';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgClass } from '@angular/common';
import { MatListItem, MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LocalizacionesService } from 'src/app/services/localizaciones.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';


export interface TerritorialEntitiesFilter {
  name:string;
  options:string[];
  defaultValue:string;
}

export class PaginatorIntl implements MatPaginatorIntl {
  firstPageLabel = $localize`First page`;
  itemsPerPageLabel = $localize`Items per page:`;
  lastPageLabel = $localize`Last page`;

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Page ${page + 1} of ${amountPages}`;
  }
  changes = new Subject<void>();

  nextPageLabel = 'Siguiente página';
  previousPageLabel = 'Anterior página';
}

@Component({
  selector: 'app-educational-institutions-management',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatSelectModule,
    MatOptionModule, MatTableModule, MatIconModule, MatPaginatorModule,
    MatTooltipModule, BubblePaginationDirective, MatMenuModule,
    MatInputModule, FormsModule, NgClass, MatListModule, CommonModule, MatButtonModule, HttpClientModule],
  templateUrl: './educational-institutions-management.component.html',
  styleUrls: ['./educational-institutions-management.component.css'],
  providers: [{ provide: MatPaginatorIntl}],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        width: '0',
        opacity: '0',
        'z-index': '-5'
      })),
      state('expanded', style({
        width: '*',
        opacity: '1',
        'z-index': '0'
      })),
      transition('collapsed <=> expanded', animate('350ms ease-out'))
    ]),
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class EducationalInstitutionsManagementComponent implements AfterViewInit, OnInit {

  departamentos: Departamento[] = [];
  municipios: Municipio[] = [];

  institucion: InstitucionEducativa[] = [];
  data = new MatTableDataSource<InstitucionEducativa>(this.institucion);

  displayedColumns = ['nombre_ie', 'nombre_c', 'cod_zerti', 'nit', 'id_mun', 'zone', 'clase', 'options'];
  expandedElement!: InstitucionEducativa | null;

  entidadesTerritoriales: EntidadTerritorial[] = ENTIDAD_TERRITORIAL;
  typeOfClass: string[]=['Oficial', 'No Oficial'];

  filtroSeleccionado: string = '';



  showFormField: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;

  @ViewChild('inputField') inputField: any;

  @Input()
  pageIndex!: number;

  defaultValue!: "Todas";

  pageNumberInput!: number;
  inputDeshabilitado!: boolean;
  habilitarCrear = true;
  mostrarTooltip = true;

  totalItems = this.data.data.length;
  itemsPerPage = 5;
  currentPage = 0;

  filterDictionary= new Map<string,string>();

  /*********************************** */



  constructor(public dialog: MatDialog, private unidadTerritorialService: LocalizacionesService) {
    this.itemsPerPage = 5;
    this.currentPage = 0
  }
  ngOnInit(): void {
    this.unidadTerritorialService.getDepartamentos().subscribe({
      next: (data: Departamento[]) => {
        this.departamentos = data;
        console.log(this.departamentos);

      }
    });

    this.unidadTerritorialService.getMunicipiosPorDepartamento('a47a54ad-ca16-4048-8f56-9f1000fe7407').subscribe({
      next: (data: Municipio[]) => {
        this.municipios = data;
        console.log(this.municipios);
      }
    })
  }

  /* Metodo encargado de filtrar la información de la tabla */
  applyFilter(event: Event, columnName: string) {
    if (columnName === 'shortname') {
      const filterValue = (event.target as HTMLInputElement).value;
      this.data.filter = filterValue.trim().toLowerCase();

      // Si la tabla tiene paginación, regresa a la primera página al aplicar el filtro
      if (this.data.paginator) {
        this.paginator.length = this.data.filteredData.length;
        this.data.paginator.firstPage();
      }

      if (this.paginator.length < 1) {
        this.deshabilitarInputPaginador();
      } else {
        this.habilitarInputPaginador();
      }
    }
  }

  onSelect(item: any) {
    console.log(item);

    let filteredData = this.institucion.filter((element: any) => {
      return element.entidad_territorial.id_et === item.value;
    })
    if (item.value !== 1) {
      this.data.data = []
      this.data.data = filteredData;
      this.habilitarCrear = false;
      this.mostrarTooltip = false;
    } else if (item.value === 1) {
      this.data.data = []
      this.data.data = this.institucion;
      this.habilitarCrear = true;
      this.mostrarTooltip = true;
    }


  }


  habilitarInputPaginador() {
    this.inputDeshabilitado = false;
  }

  deshabilitarInputPaginador() {
    this.inputDeshabilitado = true;
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
  }

  // filtrarEntidadTerritorial() {
    //   if (this.filtroSeleccionado != '') {
      //     this.data = this.data.filter(op => op.territorialEntities === this.filtroSeleccionado);
      //   } else {
        //     this.data = [...this.data];
        //   }
        // }

        /**Falta organizar lógica: se debe implementar que para
         * realizar el filtro se utilice el id que representa el tipo de clase de Institución Educativa
         * (Oficial/No Oficial) */

  showOficials() {
    let filteredData = this.institucion.filter((element: any) => {
      return element.clase.clase_ie === 'Oficial';
    })
    this.data.data = filteredData;



      }

        /**Falta organizar lógica: se debe implementar que para
         * realizar el filtro se utilice el id que representa el estado de la Institución Educativa
         * (Activo/Inactivo) */
         showIdle() {

        }

        showOnCustody() {

        }

        eliminar() {
          Swal.fire({
            title: "¿Estás seguro?",
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

  abrirCrearIE(entidadSeleccionada: any) {
    const dialogRef = this.dialog.open(CreateEducationalInstituteComponent, {data: {entidadSeleccionada}, disableClose: true});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  editar(institucion: HTMLElement) {
    const dialogRef = this.dialog.open(EditEducationalInstitutionComponent, {restoreFocus: false, data:{institucion} ,disableClose: true});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  abrirEdicionSedes(sede: HTMLElement, colegio: HTMLElement) {
    const dialogRef = this.dialog.open(EditarSedeComponent, {restoreFocus: true, data: {sede, colegio}, disableClose: true});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  abrirCreacionSedes(colegio: HTMLElement) {
    const dialogRef = this.dialog.open(CrearSedeComponent, {restoreFocus: true, data: colegio, disableClose: true});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  addFilter() {
    this.showFormField = !this.showFormField;
    if (this.showFormField) {
      setTimeout(() => {
        this.inputField.nativeElement.focus();
      }, 0);
    }
  }




  irAPaginaEspecifica() {
    this.paginator.pageIndex = this.pageNumberInput - 1;
    // Siempre y cuando el filtro arroje resultados, de lo contrario no va funcionar el input
    if (this.paginator.length > 1) {
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
          pageIndex: totalPages - 1,
          pageSize: this.paginator.pageSize,
          length: this.paginator.length
        });
      }
    }
  }

  replaceEspacios(texto: string) {
    return texto.replace(/ /g, '&nbsp');
  }

}
const ENTIDAD_TERRITORIAL: EntidadTerritorial[] = [
  { id_et: 1, id_dep: 1, id_divipol: 1, nombre_et: 'Todas', observacion: 'ob' },
  { id_et: 2, id_dep: 1, id_divipol: 1, nombre_et: 'Santiago de Cali', observacion: 'ob' },
  { id_et: 3, id_dep: 1, id_divipol: 1, nombre_et: 'Valle del Cauca', observacion: 'ob' },
  { id_et: 4, id_dep: 1, id_divipol: 1, nombre_et: 'Jamundí', observacion: 'ob' },
  { id_et: 5, id_dep: 1, id_divipol: 1, nombre_et: 'Buenaventura', observacion: 'ob' },
  { id_et: 6, id_dep: 1, id_divipol: 1, nombre_et: 'Buga', observacion: 'ob' },
  { id_et: 7, id_dep: 1, id_divipol: 1, nombre_et: 'Palmira', observacion: 'ob' }
];

const SEDES_LICEO: Sede[] = [
  {id_sede: 1, nombre_sede: 'Sede Principal', orden: '01', observacion: 'op'},
  {id_sede: 2, nombre_sede: 'La Santamaría', orden: '02', observacion: 'op'},
  {id_sede: 3, nombre_sede: 'El Almendro', orden: '03', observacion: 'op'},
  {id_sede: 4, nombre_sede: 'José María Sandoval', orden: '04', observacion: 'op'},
]

const SEDES_SANTA_LIBRADA: Sede[] = [
  {id_sede: 1, nombre_sede: 'Sede Principal', orden: '01', observacion: 'op'},
  {id_sede: 2, nombre_sede: 'La Pintada', orden: '02', observacion: 'op'},
  {id_sede: 3, nombre_sede: 'El Portal', orden: '03', observacion: 'op'},
]

const EQUIPOS: EquipoServicio[] = [
  {id_equipo: 1, id_admin: 1, nombre_es: 'Equipo 1', observacion: ''},
  {id_equipo: 2, id_admin: 2, nombre_es: 'Equipo 2', observacion: ''},
  {id_equipo: 3, id_admin: 3, nombre_es: 'Equipo 3', observacion: ''},
]

const CENTROS_POBLADOS: CentroPoblado[] = [
  {id_et: 1, id_dep: 1, id_divipol: 56561, nombre_cpo: 'La Buitrera', observacion: ''},
  {id_et: 2, id_dep: 1, id_divipol: 65561, nombre_cpo: 'CPO2', observacion: ''},
  {id_et: 3, id_dep: 1, id_divipol: 56556, nombre_cpo: 'CPO3', observacion: ''},
  {id_et: 4, id_dep: 1, id_divipol: 65984, nombre_cpo: 'CPO4', observacion: ''},
]

const CLASES_INSTITUCION: ClaseInstitucion[] = [
  {id_clase: 1, clase_ie: 'Oficial'},
  {id_clase: 2, clase_ie: 'No Oficial'},
]

const MODALIDADES: ModalidadEducativa[] = [
  {id_modalidad: 1, modalidad: 'Técnica'},
  {id_modalidad: 2, modalidad: 'Media'},
]


