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
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { LocalizacionesService } from 'src/app/services/localizaciones.service';
@Component({
  selector: 'app-create-educational-institute',
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
  templateUrl: './create-educational-institute.component.html',
  styleUrls: ['./create-educational-institute.component.css']
})
export class CreateEducationalInstituteComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public entidadSeleccionada:any,
    private unidadTerritorialService: LocalizacionesService ) { }

  clases_institucion = CLASES_INSTITUCION;
  entidad_territorial = ENTIDAD_TERRITORIAL;
  entidadTerritorialSeleccionada!: any;
  municipios: Municipio[] = [];
  departamentos: Departamento[] = [];
  equipos = EQUIPOS;
  modalidades = MODALIDADES;
  municipio!: Municipio;
  departamento!: Departamento;
  centrosPoblados: CentroPoblado[] = [];

  claseSeleccionada!: number;
  modalidadSeleccionada!: number;
  equipoSeleccionado!: number;
  departamentoSeleccionado!: number;
  municipioSeleccionado!: number;
  cpoSeleccionado!: number;

  ngOnInit(): void {
    this.municipio = this.entidadSeleccionada.municipio;
    this.departamento = this.entidadSeleccionada.departamento;
    if (this.municipio.certificado === true) {
      this.entidadTerritorialSeleccionada = this.municipio;
    } else {
      this.entidadTerritorialSeleccionada = this.departamento;
    }
    this.unidadTerritorialService.getCentrosPobladosPorMunicipio(this.municipio.uuid).subscribe({
      next: (response: CentroPoblado[]) => {
        this.centrosPoblados = response;

      }
    });

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

const CLASES_INSTITUCION: ClaseInstitucion[] = [
  {id_clase: 1, clase_ie: 'Oficial'},
  {id_clase: 2, clase_ie: 'No Oficial'},
]

const MODALIDADES: ModalidadEducativa[] = [
  {id_modalidad: 1, modalidad: 'Técnica'},
  {id_modalidad: 2, modalidad: 'Media'},
]
