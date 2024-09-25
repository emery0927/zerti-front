import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CentroPoblado } from 'src/app/models/centro-poblado';
import { ClaseInstitucion } from 'src/app/models/clase-institucion';
import { Departamento } from 'src/app/models/departamento';
import { ModalidadEducativa } from 'src/app/models/modalidad';
import { Municipio } from 'src/app/models/municipio';
import { Sede } from 'src/app/models/sede';
import { EntidadTerritorial } from 'src/app/models/entidad-territorial';
import { EquipoServicio } from 'src/app/models/equipo-servicio';
import { InstitucionEducativa } from 'src/app/models/instititucion-educativa';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-edit-educational-institution',
  standalone: true,
  imports: [MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    ImageUploadComponent],
  templateUrl: './edit-educational-institution.component.html',
  styleUrls: ['./edit-educational-institution.component.css']
})
export class EditEducationalInstitutionComponent implements OnInit {

  clases_institucion = CLASES_INSTITUCION;
  entidad_territorial = ENTIDAD_TERRITORIAL;
  municipios = MUNICIPIOS;
  departamentos = DEPARTAMENTOS;
  equipos = EQUIPOS;
  centros_poblados = CENTROS_POBLADOS;
  modalidades = MODALIDADES;
  instituciones_educativas = EDUCATIONAL_INSTITUTION;

  claseSeleccionada!: number;
  modalidadSeleccionada!: number;
  equipoSeleccionado!: number;
  departamentoSeleccionado!: number;
  municipioSeleccionado!: number;
  cpoSeleccionado!: number;
  ieCustodiaSeleccionada!: number;



  ngOnInit(): void {
    this.claseSeleccionada = this.dataInstitucion.institucion.clase.id_clase;
    this.modalidadSeleccionada = this.dataInstitucion.institucion.modalidad.id_modalidad;
    this.equipoSeleccionado = this.dataInstitucion.institucion.equipo_servicio.id_equipo;
    this.departamentoSeleccionado = this.dataInstitucion.institucion.departamento.id_departamento;
    this.municipioSeleccionado = this.dataInstitucion.institucion.municipio.id_municipio;
    this.cpoSeleccionado = this.dataInstitucion.institucion.centro_poblado.id_et;

    //this.ieCustodiaSeleccionada = this.dataInstitucion.institucion.clase.id_clase;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public dataInstitucion:any) { }


  cambioEstado(event: any): void {
    this.dataInstitucion.institucion.cerrada = event.checked;
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

const EDUCATIONAL_INSTITUTION: InstitucionEducativa[] = [
  {id_ie: 1, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10001', cod_zeti: '1001', nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.125.539-1', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: DEPARTAMENTOS[0], municipio: MUNICIPIOS[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
  {id_ie: 2, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10002', cod_zeti: '1002', nombre_ie: 'Institución Educativa DE SANTA LIBRADA', nombre_c: 'Santa Librada', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.145.251-0', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: DEPARTAMENTOS[0], municipio: MUNICIPIOS[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_SANTA_LIBRADA, escudo: '' },
  {id_ie: 3, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10003', cod_zeti: '1003', nombre_ie: 'Institución Educativa Técnico Industrial ANTONIO JOSÉ CAMACHO', nombre_c: 'Antonio José Camacho', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '805.235.444-7', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: DEPARTAMENTOS[0], municipio: MUNICIPIOS[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
  {id_ie: 4, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10004', cod_zeti: '1004', nombre_ie: 'Institución Educativa SIMÓN BOLIVAR', nombre_c: 'Simón Bolivar', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.145.478-5', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: DEPARTAMENTOS[0], municipio: MUNICIPIOS[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
  {id_ie: 5, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10005', cod_zeti: '1005', nombre_ie: 'Institución Educativa GENERAL FRANCISCO DE PAULA SANTANDER', nombre_c: 'Francisco De Paula Santander', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '900.478.565-3', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: DEPARTAMENTOS[0], municipio: MUNICIPIOS[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
  {id_ie: 6, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10006', cod_zeti: '1006', nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.125.539-1', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: DEPARTAMENTOS[0], municipio: MUNICIPIOS[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
  {id_ie: 7, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10007', cod_zeti: '1007', nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.125.539-1', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: DEPARTAMENTOS[0], municipio: MUNICIPIOS[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
  {id_ie: 8, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10008', cod_zeti: '1008', nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.125.539-1', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: DEPARTAMENTOS[0], municipio: MUNICIPIOS[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
  {id_ie: 9, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10009', cod_zeti: '1009', nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.125.539-1', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: DEPARTAMENTOS[0], municipio: MUNICIPIOS[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
  {id_ie: 10, entidad_territorial: ENTIDAD_TERRITORIAL[1], cod_zerti: '10010', cod_zeti: '1010', nombre_ie: 'Institución Educativa Liceo Departamental', nombre_c: 'Liceo Departamental', clase: CLASES_INSTITUCION[0], modalidad: MODALIDADES[0], nit: '800.125.539-1', cod_dane: '25788', cod_trd: 'ABC123', equipo_servicio: EQUIPOS[1], cerrada: false, id_custo: 0, departamento: DEPARTAMENTOS[0], municipio: MUNICIPIOS[0], centro_poblado: CENTROS_POBLADOS[1], direccion: 'Carrera 96 #53-172', correo: 'emeryesro2008@hotmail.com', telefonos: '3106360320 - 3153785132', observacion: '', estado: true, id_crea: 1, sedes: SEDES_LICEO, escudo: '' },
];
