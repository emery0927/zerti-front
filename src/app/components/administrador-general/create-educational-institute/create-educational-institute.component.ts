import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CentroPoblado } from 'src/app/models/centro-poblado';
import { ClaseInstitucion } from 'src/app/models/clase-institucion';
import { Departamento } from 'src/app/models/departamento';
import { ModalidadEducativa } from 'src/app/models/modalidad';
import { Municipio } from 'src/app/models/municipio';
import { Sede } from 'src/app/models/sede';
import { EntidadTerritorial } from 'src/app/models/entidad-territorial';
import { EquipoServicio } from 'src/app/models/equipo-servicio';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-create-educational-institute',
  templateUrl: './create-educational-institute.component.html',
  styleUrls: ['./create-educational-institute.component.css']
})
export class CreateEducationalInstituteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public entidadSeleccionada:any) { }

  clases_institucion = CLASES_INSTITUCION;
  entidad_territorial = ENTIDAD_TERRITORIAL;
  entidad_territorial_seleccionada!: any;
  municipios = MUNICIPIOS;
  departamentos = DEPARTAMENTOS;
  equipos = EQUIPOS;
  centros_poblados = CENTROS_POBLADOS;
  modalidades = MODALIDADES;

  claseSeleccionada!: number;
  modalidadSeleccionada!: number;
  equipoSeleccionado!: number;
  departamentoSeleccionado!: number;
  municipioSeleccionado!: number;
  cpoSeleccionado!: number;

  ngOnInit(): void {
    let entidadFiltrada = ENTIDAD_TERRITORIAL.filter((element: any) => {
      return element.id_et === this.entidadSeleccionada.entidadSeleccionada._value;
    })
    this.entidad_territorial_seleccionada = entidadFiltrada[0];
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

const MUNICIPIOS: Municipio[] = [
  {id_municipio: 1, nombre_mun: 'Santiago de Cali', id_departamento: 1, codigo_dane: 76001, id_et: 2, zona: 'Urb'},
  {id_municipio: 2, nombre_mun: 'Alcalá', id_departamento: 1, codigo_dane: 76020, id_et: 3, zona: 'Urb'},
  {id_municipio: 3, nombre_mun: 'Buenaventura', id_departamento: 1, codigo_dane: 76109, id_et: 5, zona: 'Urb'},
  {id_municipio: 4, nombre_mun: 'Buga', id_departamento: 1, codigo_dane: 76111, id_et: 6, zona: 'Urb'},
  {id_municipio: 5, nombre_mun: 'Jamundí', id_departamento: 1, codigo_dane: 76364, id_et: 4, zona: 'Urb'},
  {id_municipio: 6, nombre_mun: 'Palmira', id_departamento: 1, codigo_dane: 76520, id_et: 7, zona: 'Urb'}
]

const DEPARTAMENTOS: Departamento[] = [
  {id_departamento: 1, nombre_dep: 'Valle del Cauca', codigo_dane: 76415, id_et: 1},
  {id_departamento: 1, nombre_dep: 'Cundinamarca', codigo_dane: 45544, id_et: 2},
  {id_departamento: 1, nombre_dep: 'Antioquia', codigo_dane: 21556, id_et: 3},
  {id_departamento: 1, nombre_dep: 'Cauca', codigo_dane: 55645, id_et: 4},
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
