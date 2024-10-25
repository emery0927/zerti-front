// Modelo Centro Poblado
export class CentroPoblado {
  uuid: string;
  codigo: string;
  nombre: string;

  constructor(uuid: string, codigo: string, nombre: string) {
    this.uuid = uuid;
    this.codigo = codigo;
    this.nombre = nombre;
  }
}
