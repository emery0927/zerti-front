import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EntidadTerritorial } from 'src/app/models/entidad-territorial';
import { InstitucionEducativa } from 'src/app/models/instititucion-educativa';
import { LibroValoracionFinal } from 'src/app/models/libro-valoraciones-finales';
import { Sede } from 'src/app/models/sede';
import Swal from 'sweetalert2';
import { CrearSedeComponent } from '../crear-sede/crear-sede.component';
import { EditEducationalInstitutionComponent } from '../edit-educational-institution/edit-educational-institution.component';
import { EditarSedeComponent } from '../editar-sede/editar-sede.component';
import { TipoPagina } from 'src/app/models/tipo-pagina';
import { Pagina } from 'src/app/models/pagina';

@Component({
  selector: 'app-formulario-edicion-pagina',
  templateUrl: './formulario-edicion-pagina.component.html',
  styleUrls: ['./formulario-edicion-pagina.component.css']
})
export class FormularioEdicionPaginaComponent implements AfterViewInit, OnInit {

  calendario = CALENDARIO;
  sedes = SEDES_LICEO;

  numeroPagina!: string;
  tipoPagina!: string;
  nombreArchivo!: string;
  numerosPagina: string[] = [];


  //dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  //displayedColumns: string[] = ['name', 'actions'];

  constructor(public dialogRef: MatDialogRef<FormularioEdicionPaginaComponent>, @Inject(MAT_DIALOG_DATA) public dataPagina:any) {
    this.numeroPagina = this.dataPagina.pagina.numero;
    this.tipoPagina = this.dataPagina.pagina.tipo_pagina.id_tipo_pagina;
    this.nombreArchivo = this.dataPagina.pagina.archivo_pdf;
    //this.dataSource.data = TREE_DATA;
    this.itemsPerPage = 5;
    this.currentPage = 0
    this.groupedData = this.groupByYear(this.libros);
  }

  tiposPagina: TipoPagina[] = [
    {id_tipo_pagina: 1, tipo_pagina: 'Portada y Contraportada', codigo: 'P'},
    {id_tipo_pagina: 2, tipo_pagina: 'Lista de Estudiantes por Grupo o Grado', codigo: 'L'},
    {id_tipo_pagina: 3, tipo_pagina: 'Recuperaciones', codigo: 'R'},
    {id_tipo_pagina: 4, tipo_pagina: 'Novedades Académicas', codigo: 'N'},
    {id_tipo_pagina: 5, tipo_pagina: 'Promoción', codigo: 'M'},
    {id_tipo_pagina: 6, tipo_pagina: 'Otro uso', codigo: 'O'},
    {id_tipo_pagina: 7, tipo_pagina: 'Folio de Certificado, ninguna letra', codigo: 'F'}
  ]

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
  ]

  data = new MatTableDataSource<LibroValoracionFinal>(this.libros);

  librosAgrupadosPorAnio:{ [key: string]: LibroValoracionFinal[]} = {};

  dataSource = this.librosAgrupadosPorAnio;
  columnsToDisplay = ['anio', 'calendario', 'nombre_libro', 'folios']
  displayedColumns: string[] = ['anio', 'calendario', 'nombre_libro', 'folios']
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

  groupedData: any[];


  guardarCambios(): void {
    const updatedPagina: Pagina = {
      ...this.dataPagina.pagina,
      tipo_pagina: this.tiposPagina.find(t => t.id_tipo_pagina === this.dataPagina.pagina.tipo_pagina.id_tipo_pagina),
      numero: this.numeroPagina,
      archivo_pdf: this.nombreArchivo
    };
    console.log(updatedPagina);

    this.dialogRef.close(updatedPagina);
  }


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
    console.log('Crear libro');
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



  onSelect(item: any) {
    let filteredData = this.libros.filter((element: any) => {
      return element.entidad_territorial.id_et === item.value;
    })
    if (item.value !== 1) {
      this.data.data = []
      this.data.data = filteredData;
      this.habilitarCrear = false;
      this.mostrarTooltip = false;
    } else if (item.value === 1) {
      this.data.data = []
      this.data.data = this.libros;
      this.habilitarCrear = true;
      this.mostrarTooltip = true;
    }

    console.log(this.habilitarCrear);

  }

  ngOnInit(): void {
    console.log(this.dataPagina);
    this.numeroPagina = this.dataPagina.pagina.numero;
    this.tipoPagina = this.dataPagina.pagina.tipo_pagina.id_tipo_pagina;
    this.nombreArchivo = this.dataPagina.pagina.archivo_pdf;
    console.log(this.dataPagina.pagina.tipo_pagina);
    console.log(this.tiposPagina);

    for (let i = 1; i <= this.dataPagina.paginas.length; i++) {
        this.numerosPagina.push(i.toString().padStart(2, '0'));
    }

    console.log(this.numerosPagina);


    /* this.anioLectivo = this.dataLibro.libro.annio_lectivo;
    this.calendarioSeleccionado = this.dataLibro.libro.calendario;
    this.sedeSeleccionada = this.dataLibro.libro.sede.id_sede;
    this.numero = this.dataLibro.libro.numero;
    this.descripcionCorta = this.dataLibro.libro.descripcion_corta;
    this.observacion = this.dataLibro.libro.observacion; */
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
    let filteredData = this.libros.filter((element: any) => {
      return element.clase.clase_ie === 'Oficial';
    })
    this.data.data = filteredData;

    console.log(filteredData);


    console.log(this.habilitarCrear);
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
  {id_sede: 5, nombre_sede: 'Carlos Lloreda', orden: '05', observacion: 'op'},
  {id_sede: 6, nombre_sede: 'Juan Lopez', orden: '06', observacion: 'op'},
  {id_sede: 7, nombre_sede: 'Alfonso Lopez', orden: '07', observacion: 'op'},
  {id_sede: 8, nombre_sede: 'Simón Bolivar', orden: '08', observacion: 'op'},
  {id_sede: 9, nombre_sede: 'Antonio Nariño', orden: '09', observacion: 'op'},
  {id_sede: 10, nombre_sede: 'Valle del Lili', orden: '10', observacion: 'op'},
  {id_sede: 11, nombre_sede: 'La Isla', orden: '11', observacion: 'op'},
  {id_sede: 12, nombre_sede: 'Departamental', orden: '12', observacion: 'op'},
]

const libros: LibroValoracionFinal[] = [
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
    ]
