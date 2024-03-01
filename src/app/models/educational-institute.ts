// Educational Institute Model
export class EducationalInstitute {
  id_ie: number;
  cod_zerti: string;
  cod_zeti: string;
  estado: boolean;
  nombre_ie: string;
  nombre_c: string;
  id_custo: number;
  id_et: number;
  id_serv: number;
  clase: number;
  nit: string;
  cod_trd: string;
  id_dep: number;
  id_mun: number;
  id_cpo: number;
  correo: string;
  telefono: string;
  observacion: string;
  id_crea: number;

  constructor(id_ie: number, cod_zerti: string, cod_zeti: string, estado: boolean, nombre_ie: string,
    nombre_c: string, id_custo: number, id_et: number, id_serv: number, clase: number, nit: string,
    cod_trd: string, id_dep: number, id_mun: number, id_cpo: number, correo: string, telefono: string, observacion: string, id_crea: number) {
      this.id_ie = id_ie;
      this.cod_zerti = cod_zerti;
      this.cod_zeti = cod_zeti;
      this.estado = estado;
      this.nombre_ie = nombre_ie;
      this.nombre_c = nombre_c;
      this.id_custo = id_custo;
      this.id_et = id_et;
      this.id_serv = id_serv;
      this.clase = clase;
      this.nit = nit;
      this.cod_trd = cod_trd;
      this.id_dep = id_dep;
      this.id_mun = id_mun;
      this.id_cpo = id_cpo;
      this.correo = correo;
      this.telefono = telefono;
      this.observacion = observacion;
      this.id_crea=id_crea;
    }
}
