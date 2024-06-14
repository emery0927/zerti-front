import { Sede } from "./sede";

export class LibroValoracionFinal {
  id_libro_valoracion_final: number;
  annio_lectivo: string;
  calendario: string
  sede: Sede;
  numero: string;
  descripcion_corta: string;
  observacion: string;
  cantidad_aprobo: number;
  cantidad_desaprobo: number;
  cantidad_folios: number;

  constructor(id_libro_valoracion_final: number, annio_lectivo: string,
    calendario: string, sede: Sede, numero: string, descripcion_corta: string,
     observacion: string, cantidad_aprobo: number, cantidad_desaprobo: number, cantidad_libros: number, cantidad_folios: number) {
      this.id_libro_valoracion_final = id_libro_valoracion_final;
      this.annio_lectivo = annio_lectivo;
      this.calendario = calendario;
      this.sede = sede;
      this.numero = numero;
      this.descripcion_corta = descripcion_corta;
      this.observacion = observacion;
      this.cantidad_aprobo = cantidad_aprobo;
      this.cantidad_desaprobo = cantidad_desaprobo;
      this.cantidad_folios = cantidad_folios;
     }
}
