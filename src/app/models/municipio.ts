export class Municipio {
  uuid: string;
  codigo: string;
  nombre: string;
  certificado: boolean;

  constructor(uuid: string, codigo: string, nombre: string, certificado: boolean) {
    this.uuid = uuid;
    this.codigo = codigo;
    this.nombre = nombre;
    this.certificado = certificado;
  }
}
