// Modelo Equipo de Servicio
export class EquipoServicio {
  id_equipo: number;
  id_admin: number;
  nombre_es: string;
  observacion: string;


  constructor(id_equipo: number, id_admin: number, nombre_es: string, observacion: string) {
    this.id_equipo = id_equipo;
    this.id_admin = id_admin;
    this.nombre_es = nombre_es;
    this.observacion = observacion;
  }
}
