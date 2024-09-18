export class TipoPagina {

  id_tipo_pagina: number;
  tipo_pagina: string;
  codigo: string;

  constructor(id_tipo_pagina: number, tipo_pagina: string, codigo: string) {
    this.id_tipo_pagina = id_tipo_pagina;
    this.tipo_pagina = tipo_pagina;
    this.codigo = codigo;
  }
}
