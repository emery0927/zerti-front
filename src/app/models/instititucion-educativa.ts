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
  uuid: string;
  nombre: string;
  oficial: boolean;
  codigo_dane: string;
  nit: string;
  codigo_trd: string;
  direccion: string;
  correo: string;
  telefono: string;
  localizacion: number;
  modalidad: number;
  cerrado: boolean;

  constructor(uuid: string, nombre: string, oficial: boolean, codigo_dane: string,
    nit: string, codigo_trd: string, direccion: string, correo: string,
    telefono: string, localizacion: number, modalidad: number, cerrado: boolean) {
      this.uuid = uuid;
      this.nombre = nombre;
      this.oficial = oficial;
      this.codigo_dane = codigo_dane;
      this.nit = nit;
      this.codigo_trd = codigo_trd;
      this.direccion = direccion;
      this.correo = correo;
      this.telefono = telefono;
      this.localizacion = localizacion;
      this.modalidad = modalidad;
      this.cerrado = cerrado;
    }

}
