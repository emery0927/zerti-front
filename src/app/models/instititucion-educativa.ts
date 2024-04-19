import { CentroPoblado } from "./centro-poblado";
import { ClaseInstitucion } from "./clase-institucion";
import { Departamento } from "./departamento";
import { EntidadTerritorial } from "./entidad-territorial";
import { EquipoServicio } from "./equipo-servicio";
import { ModalidadEducativa } from "./modalidad";
import { Municipio } from "./municipio";
import { Sede } from "./sede";

// Educational Institute Model
export class InstitucionEducativa {
  id_ie: number;
  entidad_territorial: EntidadTerritorial;
  cod_zerti: string;
  cod_zeti: string;
  nombre_ie: string;
  nombre_c: string;
  clase: ClaseInstitucion;
  modalidad: ModalidadEducativa;
  nit: string;
  cod_dane: string;
  cod_trd: string;
  equipo_servicio: EquipoServicio;
  cerrada: boolean;
  id_custo: number;
  departamento: Departamento;
  municipio: Municipio;
  centro_poblado: CentroPoblado;
  direccion: string;
  correo: string;
  telefonos: string;
  observacion: string;
  estado: boolean;
  id_crea: number;
  sedes: Sede[];
  escudo: string;



  constructor(id_ie: number, entidad_territorial: EntidadTerritorial, cod_zerti: string, cod_zeti: string, nombre_ie: string, nombre_c: string,
    clase: ClaseInstitucion, modalidad: ModalidadEducativa, nit: string, cod_dane: string, cod_trd: string, equipo_servicio: EquipoServicio, cerrada: boolean,
    id_custo: number, departamento: Departamento, municipio: Municipio, centro_poblado: CentroPoblado, direccion: string, correo: string,
    telefonos: string, observacion: string, estado: boolean, id_crea: number, sedes: Sede[], escudo: string) {
      this.id_ie = id_ie;
      this.entidad_territorial = entidad_territorial;
      this.cod_zerti = cod_zerti;
      this.cod_zeti = cod_zeti;
      this.nombre_ie = nombre_ie;
      this.nombre_c = nombre_c;
      this.clase = clase;
      this.modalidad = modalidad;
      this.nit = nit;
      this.cod_dane = cod_dane;
      this.cod_trd = cod_trd;
      this.equipo_servicio = equipo_servicio;
      this.cerrada = cerrada;
      this.id_custo = id_custo;
      this.departamento = departamento;
      this.municipio = municipio;
      this.centro_poblado = centro_poblado;
      this.direccion = direccion;
      this.correo = correo;
      this.telefonos = telefonos;
      this.observacion = observacion;
      this.estado = estado;
      this.id_crea=id_crea;
      this.sedes = sedes;
      this.escudo = escudo;
    }
}
