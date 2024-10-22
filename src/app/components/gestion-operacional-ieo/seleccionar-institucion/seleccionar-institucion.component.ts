import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CentroPoblado } from 'src/app/models/centro-poblado';
import { ClaseInstitucion } from 'src/app/models/clase-institucion';
import { Departamento } from 'src/app/models/departamento';
import { InstitucionEducativa } from 'src/app/models/instititucion-educativa';
import { ModalidadEducativa } from 'src/app/models/modalidad';
import { Municipio } from 'src/app/models/municipio';
import { Sede } from 'src/app/models/sede';
import { EntidadTerritorial } from 'src/app/models/entidad-territorial';
import { EquipoServicio } from 'src/app/models/equipo-servicio';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TerritorialEntitiesFilter } from '../../administrador-general/educational-institutions/educational-institutions.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SidenavService } from 'src/app/services/sidenav.service';
import { VentanaTrabajo } from 'src/app/models/ventana-trabajo';
import { DialogRef } from '@angular/cdk/dialog';
import { Subject } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-seleccionar-institucion',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatIconModule, MatSelectModule, MatTableModule, CommonModule, MatButtonModule, MatInputModule ],
  templateUrl: './seleccionar-institucion.component.html',
  styleUrls: ['./seleccionar-institucion.component.css'],
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
export class SeleccionarInstitucionComponent implements AfterViewInit, OnInit {
  departamentos: Departamento[] = [];
  municipios: Municipio[] = [];

  institucion: InstitucionEducativa[] = [
    {id_ie: 1, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10001', cod_zeti: '1001', nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.125.539-1', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: this.departamentos[0], municipio: this.municipios[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '../../../assets/img/liceo_escudo.jpg' },
    {id_ie: 2, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10002', cod_zeti: '1002', nombre_ie: 'Institución Educativa DE SANTA LIBRADA', nombre_c: 'Santa Librada', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.145.251-0', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: this.departamentos[0], municipio: this.municipios[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_SANTA_LIBRADA, escudo: '' },
    {id_ie: 3, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10003', cod_zeti: '1003', nombre_ie: 'Institución Educativa Técnico Industrial ANTONIO JOSÉ CAMACHO', nombre_c: 'Antonio José Camacho', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '805.235.444-7', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: this.departamentos[0], municipio: this.municipios[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: [], escudo: '' },
    {id_ie: 4, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10004', cod_zeti: '1004', nombre_ie: 'Institución Educativa SIMÓN BOLIVAR', nombre_c: 'Simón Bolivar', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.145.478-5', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: this.departamentos[0], municipio: this.municipios[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
    {id_ie: 5, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10005', cod_zeti: '1005', nombre_ie: 'Institución Educativa GENERAL FRANCISCO DE PAULA SANTANDER', nombre_c: 'Francisco De Paula Santander', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '900.478.565-3', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: this.departamentos[0], municipio: this.municipios[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
    {id_ie: 6, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10006', cod_zeti: '1006', nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', clase: CLASES_INSTITUCION[1], modalidad: MODALIDADES[0], nit: '800.125.539-1', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: this.departamentos[0], municipio: this.municipios[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
    {id_ie: 7, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10007', cod_zeti: '1007', nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.125.539-1', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: this.departamentos[0], municipio: this.municipios[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
    {id_ie: 8, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10008', cod_zeti: '1008', nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.125.539-1', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: this.departamentos[0], municipio: this.municipios[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
    {id_ie: 9, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10009', cod_zeti: '1009', nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.125.539-1', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: this.departamentos[0], municipio: this.municipios[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
    {id_ie: 10, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10010', cod_zeti: '1010', nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.125.539-1', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento:this.departamentos[0], municipio: this.municipios[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
  ];

  data = new MatTableDataSource<InstitucionEducativa>(this.institucion);
  displayedColumns = ['nombre_ie', 'cod_zerti', 'nit', 'id_mun'];
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

  rol!: number;
  ventanaTrabajo!: VentanaTrabajo;

  constructor(public dialog: MatDialog, private sidenavService: SidenavService, public dialogRef: DialogRef) {
    this.itemsPerPage = 5;
    this.currentPage = 0
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async cargarVentanaRol(institucion: InstitucionEducativa) {

    this.rol = 2;
    this.ventanaTrabajo = new VentanaTrabajo(this.rol, this.rol, institucion.nombre_ie);
    this.sidenavService.cargarVentanasRolAdmin(this.ventanaTrabajo);
    this.closeDialog();
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
              isMatch = (value=="Todas") || (record[key as keyof InstitucionEducativa] == value);
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
