// Territorial Entity Model
export class TerritorialEntity {
  id_et: number;
  id_dep: number;
  id_divipol: number;
  nombre_et: number;
  observacion: string;


  constructor(id_et: number, id_dep: number, id_divipol: number, nombre_et: number, observacion: string) {
    this.id_et = id_et;
    this.id_dep = id_dep;
    this.id_divipol = id_divipol;
    this.nombre_et = nombre_et;
    this.observacion = observacion;
  }
}
