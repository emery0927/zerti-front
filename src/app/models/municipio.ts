export class Municipio {
  id_municipio: number;
  nombre_mun: string;
  id_departamento: number;
  codigo_dane: number;
  id_et: number;

  constructor(id_municipio: number, nombre_mun: string, id_departamento: number, codigo_dane: number, id_et: number) {
    this.id_municipio = id_municipio;
    this.nombre_mun = nombre_mun;
    this.id_departamento = id_departamento;
    this.codigo_dane = codigo_dane;
    this.id_et = id_et;
  }
}
