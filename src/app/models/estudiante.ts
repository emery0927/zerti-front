// Student Model
export class Estudiante {
  id_stu: number;
  nombres: string;
  apellidos: string;
  documento: string;
  codigo: number;
  id_sede: number;
  jornada: string;
  grado: number;
  estado: string;
  correo: string;

  constructor(id_stu: number, nombres: string,
    apellidos: string, documento: string, codigo: number, id_sede: number,
    jornada: string, grado: number, estado: string, correo: string) {
      this.id_stu = id_stu;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.documento = documento;
      this.codigo = codigo;
      this.id_sede = id_sede;
      this.jornada = jornada;
      this.grado = grado;
      this.estado = estado;
      this.correo = correo;
    }

}
