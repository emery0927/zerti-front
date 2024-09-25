import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTreeFlattener } from '@angular/material/tree';
import { InstitucionEducativa } from 'src/app/models/instititucion-educativa';
import { LibroValoracionFinal } from 'src/app/models/libro-valoraciones-finales';
import { Sede } from 'src/app/models/sede';
import Swal from 'sweetalert2';
import { CrearSedeComponent } from '../crear-sede/crear-sede.component';
import { EditEducationalInstitutionComponent } from '../edit-educational-institution/edit-educational-institution.component';
import { EditarSedeComponent } from '../editar-sede/editar-sede.component';
import { EntidadTerritorial } from 'src/app/models/entidad-territorial';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

export interface AnioLectivo {
  annio_lectivo: string;
  calendario: string;
  cantidad_libros_total: number;
  cantidad_folios_total: number;
  cantidad_aprobados: number;
  cantidad_desaprobados: number;
  SedesLibro: LibroXSede[];
}

export interface LibroXSede {
  nombre_sede: string;
  cantidad_libros_total: number;
  cantidad_folios_total: number;
  cantidad_aprobados: number;
  cantidad_desaprobados: number;
  libros: LibroValoracionFinal[];
};

@Component({
  selector: 'app-formulario-creacion-libros',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatSelectModule, MatOptionModule, MatTableModule, CommonModule],
  templateUrl: './formulario-creacion-libros.component.html',
  styleUrls: ['./formulario-creacion-libros.component.css']
})
export class FormularioCreacionLibrosComponent implements OnInit {

  calendario = CALENDARIO;
  sedes = this.sede.sedes;
  sedeSeleccionada!: Sede;




  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public sede:any) {
    this.groupedData = this.groupByYear(this.libros);
  }

  libros: LibroValoracionFinal[] = [
    {id_libro_valoracion_final: 1, annio_lectivo: '2018', calendario: 'A', sede: SEDES_LICEO[0],
    numero: '1-1', descripcion_corta: 'Grados 6 a 9', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 750 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[1],
    numero: '1-1', descripcion_corta: 'Grados 10 y 11', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 800 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2020', calendario: 'A', sede: SEDES_LICEO[2],
    numero: '1-1', descripcion_corta: 'Grado 8', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 900 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2021', calendario: 'A', sede: SEDES_LICEO[3],
    numero: '1-1', descripcion_corta: 'Grado 9', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 300 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2018', calendario: 'A', sede: SEDES_LICEO[0],
    numero: '1-1', descripcion_corta: 'Grado 3', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 150 },
  ]

  data = new MatTableDataSource<LibroValoracionFinal>(this.libros);

  librosAgrupadosPorAnio:{ [key: string]: LibroValoracionFinal[]} = {};

  dataSource = this.librosAgrupadosPorAnio;
  columnsToDisplay = ['anio', 'calendario', 'nombre_libro', 'folios']
  displayedColumns: string[] = ['anio', 'calendario', 'nombre_libro', 'folios']
  expandedElement!: InstitucionEducativa | null;

  entidadesTerritoriales: EntidadTerritorial[] = ENTIDAD_TERRITORIAL;



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

  ngOnInit(): void {
    this.sedeSeleccionada = this.sede.sedes[0];
    this.agruparLibrosPorAnio();
  }

}

export interface Calendario {
  id_calendario: number;
  descripcion: string;
}

const CALENDARIO: Calendario[] = [
  { id_calendario: 1, descripcion: 'A' },
  { id_calendario: 2, descripcion: 'B' },
]

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

const libros: LibroValoracionFinal[] = [
  {id_libro_valoracion_final: 1, annio_lectivo: '2018', calendario: 'A', sede: SEDES_LICEO[0],
    numero: '1-1', descripcion_corta: 'Grados 6 a 9', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 750 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2019', calendario: 'A', sede: SEDES_LICEO[1],
    numero: '1-1', descripcion_corta: 'Grados 10 y 11', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 800 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2020', calendario: 'A', sede: SEDES_LICEO[2],
    numero: '1-1', descripcion_corta: 'Grado 8', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 900 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2021', calendario: 'A', sede: SEDES_LICEO[3],
    numero: '1-1', descripcion_corta: 'Grado 9', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 300 },
    {id_libro_valoracion_final: 1, annio_lectivo: '2018', calendario: 'A', sede: SEDES_LICEO[0],
    numero: '1-1', descripcion_corta: 'Grado 3', observacion: 'observación',
    cantidad_aprobo: 700, cantidad_desaprobo: 35, cantidad_folios: 150 },
    ]

const LibroXSede: LibroXSede[] = [
      {nombre_sede: 'Sede Principal', cantidad_libros_total: 2, cantidad_folios_total: 800, cantidad_aprobados: 790, cantidad_desaprobados: 10, libros: libros}
    ]

const AnioLectivo: AnioLectivo[] = [
      {annio_lectivo: '2012', calendario: 'B', cantidad_libros_total: 2, cantidad_folios_total: 750, cantidad_aprobados: 700, cantidad_desaprobados: 50, SedesLibro: LibroXSede}
    ]
