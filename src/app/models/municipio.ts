export class Municipio {
  id_municipio: number;
  nombre_mun: string;
  id_departamento: number;
  codigo_dane: number;
  id_et: number;
  zona: string;

  constructor(id_municipio: number, nombre_mun: string, id_departamento: number, codigo_dane: number, id_et: number, zona: string) {
    this.id_municipio = id_municipio;
    this.nombre_mun = nombre_mun;
    this.id_departamento = id_departamento;
    this.codigo_dane = codigo_dane;
    this.id_et = id_et;
    this.zona = zona;
  }
}
