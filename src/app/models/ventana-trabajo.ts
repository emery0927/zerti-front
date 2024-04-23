export class VentanaTrabajo {
  id: number;
  rol: number;
  nombre: string;

  constructor(id: number, rol: number, nombre: string) {
    this.id = id;
    this.rol = rol;
    this.nombre = nombre;
  }
}
