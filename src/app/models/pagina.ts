export class Pagina {
  id_pagina: number;
  numero: string;
  tipo_pagina: string;
  archivo_pdf: string;

  constructor(id_pagina: number, numero: string , tipo_pagina: string, archivo_pdf: string) {
    this.id_pagina = id_pagina;
    this.numero = numero;
    this.tipo_pagina = tipo_pagina;
    this.archivo_pdf = archivo_pdf;
  }
}
