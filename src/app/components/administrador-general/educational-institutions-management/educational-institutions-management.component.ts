import { AfterViewInit, Component, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateEducationalInstituteComponent } from '../create-educational-institute/create-educational-institute.component';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { EditEducationalInstitutionComponent } from '../edit-educational-institution/edit-educational-institution.component';
import Swal from 'sweetalert2';
import { EducationalInstitute } from 'src/app/models/educational-institute';
import { trigger, state, style, animate, transition } from '@angular/animations';


export interface TerritorialEntitiesFilter {
  name:string;
  options:string[];
  defaultValue:string;
}

export interface EntidadTerritorial {
  id: number;
  nombre: string;
}

const ENTIDAD_TERRITORIAL: EntidadTerritorial[] = [
  { id: 1, nombre: 'Todas' },
  { id: 2, nombre: 'Santiago de Cali' },
  { id: 3, nombre: 'Valle del Cauca' },
  { id: 4, nombre: 'Jamundí' }
];


@Component({
  selector: 'app-educational-institutions-management',
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
    ])
  ]

})
export class EducationalInstitutionsManagementComponent implements AfterViewInit, OnInit {

  entidadesTerritoriales: EntidadTerritorial[] = ENTIDAD_TERRITORIAL;
  territorialEntitiesFilter: TerritorialEntitiesFilter[]=[];
  displayedColumns: string[] = ['nombre_ie', 'nombre_c', 'cod_zerti', 'nit', 'id_mun', 'zone', 'clase', 'options'];

  typeOfClass: string[]=['Oficial', 'No Oficial'];

  filtroSeleccionado: string = '';

  data = new MatTableDataSource<EducationalInstitute>(EDUCATIONAL_INSTITUTION);

  showFormField: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild('inputField') inputField: any;

  @Input()
  pageIndex!: number;

  defaultValue!: "Todas";

  pageNumberInput!: number;
  inputDeshabilitado!: boolean;

  totalItems = this.data.data.length;
  itemsPerPage = 5;
  currentPage = 0;

  filterDictionary= new Map<string,string>();

  constructor(public dialog: MatDialog) {
    this.itemsPerPage = 5;
    this.currentPage = 0


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
    let filteredData = EDUCATIONAL_INSTITUTION.filter((element: any) => {
      return element.id_et === item.value;
    })
    if (item.value !== 1) {
      this.data.data = []
      this.data.data = filteredData;
    } else if (item.value === 1) {
      this.data.data = []
      this.data.data = EDUCATIONAL_INSTITUTION;
    }
  }

  ngOnInit(): void {

  }

  habilitarInputPaginador() {
    this.inputDeshabilitado = false;
  }

  deshabilitarInputPaginador() {
    this.inputDeshabilitado = true;
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
  }

  // filtrarEntidadTerritorial() {
  //   if (this.filtroSeleccionado != '') {
  //     this.data = this.data.filter(op => op.territorialEntities === this.filtroSeleccionado);
  //   } else {
  //     this.data = [...this.data];
  //   }
  // }


  filterByTerritorialEntity(ob:MatSelectChange,territorialEntitiesFilter:TerritorialEntitiesFilter) {
    this.data.filterPredicate = function (record,filter) {
      // sourcery skip: avoid-using-var
      var map = new Map(JSON.parse(filter));
      let isMatch = false;
      for(let [key,value] of map){
        isMatch = (value=="Todas") || (record[key as keyof EducationalInstitute] == value);
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

  abrirCrearIE() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { top: '0' };

    const dialogRef = this.dialog.open(CreateEducationalInstituteComponent, dialogConfig);
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

  /**Falta organizar lógica: se debe implementar que para
   * realizar el filtro se utilice el id que representa el tipo de clase de Institución Educativa
   * (Oficial/No Oficial) */
   showOficials() {

    }

    /**Falta organizar lógica: se debe implementar que para
     * realizar el filtro se utilice el id que representa el estado de la Institución Educativa
     * (Activo/Inactivo) */
     showIdle() {

    }

    showOnCustody() {

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

const EDUCATIONAL_INSTITUTION: EducationalInstitute[] = [
  {id_ie: 1, cod_zerti: '1001', cod_zeti: '1001', estado: true, nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', id_custo: 1, id_et: 2, id_serv: 1, clase:1, nit: '800.125.539-1', cod_trd: 'ABC123', id_dep: 1, id_mun: 1, id_cpo: 1, correo: '', telefono: '', observacion: '', id_crea: 1},
  {id_ie: 2, cod_zerti: '1002', cod_zeti: '1002', estado: true, nombre_ie: 'Institución Educativa DE SANTA LIBRADA', nombre_c: 'Santa Librada - Cali', id_custo: 1, id_et: 2, id_serv: 1, clase:1, nit: '800.145.251-0', cod_trd: 'ABC123', id_dep: 1, id_mun: 1, id_cpo: 1, correo: '', telefono: '', observacion: '', id_crea: 1},
  {id_ie: 3, cod_zerti: '1003', cod_zeti: '1003', estado: true, nombre_ie: 'Institución Educativa Técnico Indusatrial ANTONIO JOSÉ CAMACHO', nombre_c: 'IETI Antonio José Camacho', id_custo: 1, id_et: 2, id_serv: 1, clase:1, nit: '805.235.444-7', cod_trd: 'ABC123', id_dep: 1, id_mun: 1, id_cpo: 1, correo: '', telefono: '', observacion: '', id_crea: 1},
  {id_ie: 4, cod_zerti: '1004', cod_zeti: '1004', estado: true, nombre_ie: 'Institución Educativa SIMÓN BOLIVAR', nombre_c: 'Simón Bolivar', id_custo: 1, id_et: 2, id_serv: 1, clase:1, nit: '800.145.478-5', cod_trd: 'ABC123', id_dep: 1, id_mun: 1, id_cpo: 1, correo: '', telefono: '', observacion: '', id_crea: 1},
  {id_ie: 5, cod_zerti: '1005', cod_zeti: '1005', estado: true, nombre_ie: 'Institución Educativa GENERAL FRANCISCO DE PAULA SANTANDER', nombre_c: 'Fco de Paula Santander', id_custo: 1, id_et: 1, id_serv: 1, clase:1, nit: '900.478.565-3', cod_trd: 'ABC123', id_dep: 1, id_mun: 1, id_cpo: 1, correo: '', telefono: '', observacion: '', id_crea: 1},
  {id_ie: 6, cod_zerti: '1006', cod_zeti: '1006', estado: true, nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', id_custo: 1, id_et: 2, id_serv: 1, clase:1, nit: '800.125.539-1', cod_trd: 'ABC123', id_dep: 1, id_mun: 1, id_cpo: 1, correo: '', telefono: '', observacion: '', id_crea: 1},
  {id_ie: 7, cod_zerti: '1007', cod_zeti: '1007', estado: true, nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', id_custo: 1, id_et: 2, id_serv: 1, clase:1, nit: '800.125.539-1', cod_trd: 'ABC123', id_dep: 1, id_mun: 1, id_cpo: 1, correo: '', telefono: '', observacion: '', id_crea: 1},
  {id_ie: 8, cod_zerti: '1008', cod_zeti: '1008', estado: true, nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', id_custo: 1, id_et: 2, id_serv: 1, clase:1, nit: '800.125.539-1', cod_trd: 'ABC123', id_dep: 1, id_mun: 1, id_cpo: 1, correo: '', telefono: '', observacion: '', id_crea: 1},
  {id_ie: 9, cod_zerti: '1009', cod_zeti: '1009', estado: true, nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', id_custo: 1, id_et: 1, id_serv: 1, clase:1, nit: '800.125.539-1', cod_trd: 'ABC123', id_dep: 1, id_mun: 1, id_cpo: 1, correo: '', telefono: '', observacion: '', id_crea: 1},
  {id_ie: 10, cod_zerti: '1010', cod_zeti: '1010', estado: true, nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', id_custo: 1, id_et: 1, id_serv: 1, clase:1, nit: '800.125.539-1', cod_trd: 'ABC123', id_dep: 1, id_mun: 1, id_cpo: 1, correo: '', telefono: '', observacion: '', id_crea: 1},
];