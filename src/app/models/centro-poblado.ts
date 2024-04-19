// Modelo Centro Poblado
export class CentroPoblado {
  id_et: number;
  id_dep: number;
  id_divipol: number;
  nombre_cpo: string;
  observacion: string;


  constructor(id_et: number, id_dep: number, id_divipol: number, nombre_cpo: string, observacion: string) {
    this.id_et = id_et;
    this.id_dep = id_dep;
    this.id_divipol = id_divipol;
    this.nombre_cpo = nombre_cpo;
    this.observacion = observacion;
  }
}
