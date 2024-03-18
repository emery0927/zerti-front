export class Departamento {
  id_departamento: number;
  nombre_dep: string;
  codigo_dane: number;
  id_et: number;

  constructor(id_departamento: number, nombre_dep: string, codigo_dane: number, id_et: number) {
    this.id_departamento = id_departamento;
    this.nombre_dep = nombre_dep;
    this.codigo_dane = codigo_dane;
    this.id_et = id_et;
  }
}
