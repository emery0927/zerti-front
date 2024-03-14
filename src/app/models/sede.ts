// Modelo para Sede
export class Sede {
  id_sede: number;
  nombre_sede: string;
  orden: string;
  observacion: string;


  constructor(id_sede: number, nombre_sede: string, orden: string, observacion: string) {
    this.id_sede = id_sede;
    this.nombre_sede = nombre_sede;
    this.orden = orden;
    this.observacion = observacion;
  }
}
