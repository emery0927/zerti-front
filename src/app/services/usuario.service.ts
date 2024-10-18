import { Injectable } from "@angular/core";
import { Usuario } from "../models/usuario";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  public usuario$ = this.usuarioSubject.asObservable();

  constructor() { }

  setUsuario(usuario: Usuario): void {
    this.usuarioSubject.next(usuario);
  }

  getUsuario(): Usuario | null {
    return this.usuarioSubject.value;
  }
}
