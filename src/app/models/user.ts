// User Model
export class User {
  id_usu: number;
  tipo_doc: number;
  num_doc: string;
  fec_nac: Date;
  nombres: string;
  apellidos: string;
  rol: number;
  id_dep: number;
  id_mun: number;
  id_cpob: number;
  direccion: string;
  correo: string;
  telefono: string;
  observacion: string;
  activo: boolean;
  verificado: boolean;
  id_crea: number;

  constructor(id: number, tipo_doc: number, num_doc: string, fec_nac: Date,
    nombres: string, apellidos: string, rol: number, id_dep: number, id_mun: number, id_cpob: number, direccion: string, correo: string,
    telefono: string, observacion: string, activo: boolean, verificado: boolean, id_crea: number) {
      this.id_usu = id;
      this.tipo_doc = tipo_doc;
      this.num_doc = num_doc;
      this.fec_nac = fec_nac;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.rol = rol;
      this.id_dep = id_dep;
      this.id_mun = id_mun;
      this.id_cpob = id_cpob;
      this.direccion = direccion;
      this.correo = correo;
      this.telefono = telefono;
      this.observacion = observacion;
      this.activo = activo;
      this.verificado = verificado;
      this.id_crea = id_crea;

  }
}

