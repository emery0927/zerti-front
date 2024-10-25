import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CentroPoblado } from 'src/app/models/centro-poblado';
import { ClaseInstitucion } from 'src/app/models/clase-institucion';
import { Departamento } from 'src/app/models/departamento';
import { InstitucionEducativa } from 'src/app/models/instititucion-educativa';
import { Sede } from 'src/app/models/sede';
import Swal from 'sweetalert2';
import { CrearSedeComponent } from '../crear-sede/crear-sede.component';
import { CreateEducationalInstituteComponent } from '../create-educational-institute/create-educational-institute.component';
import { EditEducationalInstitutionComponent } from '../edit-educational-institution/edit-educational-institution.component';
import { EditarSedeComponent } from '../editar-sede/editar-sede.component';
import { EntidadTerritorial } from 'src/app/models/entidad-territorial';
import { EquipoServicio } from 'src/app/models/equipo-servicio';
import { LibroValoracionFinal } from 'src/app/models/libro-valoraciones-finales';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { FormularioCreacionLibrosComponent } from '../formulario-creacion-libros/formulario-creacion-libros.component';
import { FormularioEdicionLibrosComponent } from '../formulario-edicion-libros/formulario-edicion-libros.component';
import { ModalidadEducativa } from 'src/app/models/modalidad';
import { Municipio } from 'src/app/models/municipio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
export interface AnioLectivo {
  id_anio: number;
  annio_lectivo: string;
}

export interface LibroXSede {
  nombre_sede: string;
  cantidad_libros_total: number;
  cantidad_folios_total: number;
  cantidad_aprobados: number;
  cantidad_desaprobados: number;
  libros: LibroValoracionFinal[];
};

export interface AgrupacionPorSede {
  sede: Sede;
  cantidad_libros: number;
  cantidad_folios: number;
  cantidad_aprobados: number;
  cantidad_desaprobados: number;
  libros: LibroValoracionFinal[];
}


@Component({
  selector: 'app-libros-annio-lectivo',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, MatSelectModule, MatIconModule, MatListModule, MatMenuModule, NgClass, CommonModule, MatButtonModule],
  templateUrl: './libros-annio-lectivo.component.html',
  styleUrls: ['./libros-annio-lectivo.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        width: '*',
        opacity: '1',
        'z-index': '3'
      })),
      state('expanded', style({
        width: '*',
        opacity: '1',
        'z-index': '3'
      })),
      transition('collapsed <=> expanded', animate('350ms ease-out'))
    ]),
    trigger('detailExpand', [
      state('collapsed', style({height: '*'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LibrosAnnioLectivoComponent implements AfterViewInit, OnInit {

  constructor(public dialog: MatDialog) {
    this.itemsPerPage = 5;
    this.currentPage = 0
    this.groupedData = this.groupByYear(this.libros);
  }

  libros: LibroValoracionFinal[] = [
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[0],
    numero: '1-1', descripcion_corta: 'Grados 6 a 9', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 750 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[1],
    numero: '1-1', descripcion_corta: 'Grados 10 y 11', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 800 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[2],
    numero: '1-1', descripcion_corta: 'Grado 8', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 900 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[3],
    numero: '1-1', descripcion_corta: 'Grado 9', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 300 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[0],
    numero: '1-1', descripcion_corta: 'Grado 3', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 150 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[4],
      numero: '1-1', descripcion_corta: 'Grado 3', observacion: 'observación',
      cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 150 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[5],
    numero: '1-1', descripcion_corta: 'Grado 3', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 150 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[6],
      numero: '1-1', descripcion_corta: 'Grado 3', observacion: 'observación',
      cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 150 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[7],
    numero: '1-1', descripcion_corta: 'Grado 3', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 150 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[8],
    numero: '1-1', descripcion_corta: 'Grados 6 a 9', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 750 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[9],
    numero: '1-1', descripcion_corta: 'Grados 10 y 11', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 800 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[10],
    numero: '1-1', descripcion_corta: 'Grado 8', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 900 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[11],
    numero: '1-1', descripcion_corta: 'Grado 9', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 300 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[11],
    numero: '1-1', descripcion_corta: 'Grado 3', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 150 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[11],
      numero: '1-1', descripcion_corta: 'Grado 3', observacion: 'observación',
      cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 150 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[11],
    numero: '1-1', descripcion_corta: 'Grado 3', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 150 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[10],
      numero: '1-1', descripcion_corta: 'Grado 3', observacion: 'observación',
      cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 150 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[9],
    numero: '1-1', descripcion_corta: 'Grado 3', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 150 },

  ]

  departamentos: Departamento[] = [];
  municipios: Municipio[] = [];

  /* institucion: InstitucionEducativa[] = [
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
  ]; */

  data = new MatTableDataSource<AgrupacionPorSede>(this.agruparPorSede(this.libros));

  librosAgrupadosPorAnio:{ [key: string]: LibroValoracionFinal[]} = {};

  //dataSource = this.librosAgrupadosPorAnio;
  columnsToDisplay = ['anio_lectivo', 'nombre_sede', 'cantidad_libros', 'cantidad_folios', 'cantidad_aprobo', 'cantidad_desaprobo', 'opciones']
  displayedColumns: string[] = ['nombre_sede', 'cantidad_libros', 'cantidad_folios', 'porcentaje_aprobo', 'porcentaje_no_aprobo', 'opciones'];
  expandedElement!: InstitucionEducativa | null;

  entidadesTerritoriales: EntidadTerritorial[] = ENTIDAD_TERRITORIAL;
  typeOfClass: string[]=['Oficial', 'No Oficial'];

  //institucionEducativa = this.institucion;
  anios = AnioLectivo;

  institucionSeleccionada!: any;

  institucionesPorET!: InstitucionEducativa[];

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

  groupedData: any[];


  agruparPorAnnioYSede(): any {
    const agrupado: { [annio: string]: { [sedeId: number]: LibroValoracionFinal[], cantidad_libros: number } } = {};

    this.libros.forEach(libro => {
      const { annio_lectivo, sede } = libro;

      if (!agrupado[annio_lectivo]) {
        agrupado[annio_lectivo] = {cantidad_libros: 0 };
      }

      if (!agrupado[annio_lectivo][sede.id_sede]) {
        agrupado[annio_lectivo][sede.id_sede] = [];
      }

      agrupado[annio_lectivo][sede.id_sede].push(libro);

    });

    return agrupado;

  }

  agruparPorSede(libros: LibroValoracionFinal[]): AgrupacionPorSede[] {
    const agrupados = new Map<Sede, LibroValoracionFinal[]>();

    libros.forEach((libro) => {
      const sedeNombre = libro.sede;
      if (!agrupados.has(sedeNombre)) {
        agrupados.set(sedeNombre, []);
        }
        agrupados.get(sedeNombre)!.push(libro);
        });

        const resultado: AgrupacionPorSede[] = [];
        agrupados.forEach((libros, sede) => {
          let sumatoria_folios: number = 0;
          let sumatoria_aprobados: number = 0;
          let sumatoria_desaprobados: number = 0;
          libros.forEach((libros) => {
        sumatoria_folios += libros.cantidad_folios;
        sumatoria_aprobados += libros.cantidad_aprobo;
        sumatoria_desaprobados += libros.cantidad_desaprobo;
      });
      resultado.push({
        sede, libros,
        cantidad_libros: libros.length,
        cantidad_folios: sumatoria_folios,
        cantidad_aprobados: sumatoria_aprobados,
        cantidad_desaprobados: sumatoria_desaprobados
      });
    });


    return resultado;
  }

  agruparLibrosPorAnio(): void {
    this.librosAgrupadosPorAnio = this.libros.reduce((acc: { [key: string]: LibroValoracionFinal[] }, libro) => {
      (acc[libro.annio_lectivo] = acc[libro.annio_lectivo] || []).push(libro);
      return acc;
    }, {});
  }

  getAnios(): string[] {
    return Object.keys(this.librosAgrupadosPorAnio);
  }
  crearLibro(): void {
      }

  groupByYear(data: any[]): any[] {
    return Object.values(data.reduce((acc, obj) => {
      const key = obj.year;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {}));
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


  onEntidadTerritorialChange(event: any) {
    const entidadTerritorialId = event.value;
    //this.institucionesPorET = this.institucionEducativa.filter(institucion => institucion.entidad_territorial.id_et === entidadTerritorialId);
  }

  onInstitucionChange(event: any) {
    const institucionId = event.value;
    //this.institucionSeleccionada = this.institucionesPorET.find(institucion => institucion.id_ie === institucionId);

   /*  debugger;

    let filteredData = this.libros.filter((element: any) => {
      return element.id_ie === this.institucionSeleccionada.id_ie;
    })
    this.data.data = this.agruparPorSede(filteredData);

     */

  }

  ngOnInit(): void {
    this.onEntidadTerritorialChange({value:2});
    this.onInstitucionChange({value:1});
        this.agruparLibrosPorAnio();
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

 /*  showOficials() {
    let filteredData = this.libros.filter((element: any) => {
      return element.clase.clase_ie === 'Oficial';
    })
    this.data.data = filteredData;



      } */

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
            text: "El libro será eliminado de forma permanente",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#b16448",
      cancelButtonColor: "#d5a14f",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Libro Eliminado",
          text: "El libro ha sido eliminado satisfactoriamente",
          icon: "success",
          confirmButtonColor: "#b16448"
        });
      }
    });
  }

  abrirCrearLibro() {
    const dialogRef = this.dialog.open(FormularioCreacionLibrosComponent, {data: this.institucionSeleccionada, disableClose: true});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  editar(libro: HTMLElement) {
    const dialogRef = this.dialog.open(FormularioEdicionLibrosComponent, {restoreFocus: false, data:{libro} ,disableClose: true});
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
  {id_sede: 5, nombre_sede: 'Carlos Lloreda', orden: '05', observacion: 'op'},
  {id_sede: 6, nombre_sede: 'Juan Lopez', orden: '06', observacion: 'op'},
  {id_sede: 7, nombre_sede: 'Alfonso Lopez', orden: '07', observacion: 'op'},
  {id_sede: 8, nombre_sede: 'Simón Bolivar', orden: '08', observacion: 'op'},
  {id_sede: 9, nombre_sede: 'Antonio Nariño', orden: '09', observacion: 'op'},
  {id_sede: 10, nombre_sede: 'Valle del Lili', orden: '10', observacion: 'op'},
  {id_sede: 11, nombre_sede: 'La Isla', orden: '11', observacion: 'op'},
  {id_sede: 12, nombre_sede: 'Departamental', orden: '12', observacion: 'op'},
]

const AnioLectivo: AnioLectivo[] = [
      {id_anio: 1, annio_lectivo: '2019'},
      {id_anio: 1, annio_lectivo: '2020'},
      {id_anio: 1, annio_lectivo: '2021'},
      {id_anio: 1, annio_lectivo: '2022'},
      {id_anio: 1, annio_lectivo: '2023'}
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

const CLASES_INSTITUCION: ClaseInstitucion[] = [
  {id_clase: 1, clase_ie: 'Oficial'},
  {id_clase: 2, clase_ie: 'No Oficial'},
]

const MODALIDADES: ModalidadEducativa[] = [
  {id_modalidad: 1, modalidad: 'Técnica'},
  {id_modalidad: 2, modalidad: 'Media'},
]

