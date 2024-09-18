import { TipoPagina } from "./tipo-pagina";

export class Pagina {
  id_pagina: number;
  numero: string;
  tipo_pagina: TipoPagina;
  archivo_pdf: string;
  estado: boolean;

  constructor(id_pagina: number, numero: string , tipo_pagina: TipoPagina, archivo_pdf: string, estado: boolean) {
    this.id_pagina = id_pagina;
    this.numero = numero;
    this.tipo_pagina = tipo_pagina;
    this.archivo_pdf = archivo_pdf;
    this.estado = estado;
  }
}
