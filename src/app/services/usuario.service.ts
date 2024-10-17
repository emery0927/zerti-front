import { Injectable } from "@angular/core";
import { Usuario } from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuario!: Usuario;

  constructor() { }

  setUsuario(usuario: Usuario): void {
    this.usuario = usuario;
  }

  getUsuario(): Usuario {
    return this.usuario;
  }
}
