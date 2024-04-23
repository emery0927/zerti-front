import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Subject } from 'rxjs'
import { VentanaTrabajo } from '../models/ventana-trabajo';


@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private sidenav!: MatSidenav;
  private buttonClickSubject = new Subject<VentanaTrabajo>();
  buttonClick$ = this.buttonClickSubject.asObservable();


  setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  cargarVentanasRolAdmin(ventanaTrabajo: VentanaTrabajo) {
    this.buttonClickSubject.next(ventanaTrabajo);

  }

  abrirSidenav() {
    this.sidenav.open();
  }

  cerrarSidenav() {
    this.sidenav.close();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  // With this subject you can save the sidenav state and consumed later into other pages.
  public sideNavState$: Subject<boolean> = new Subject();

  constructor() { }

}
