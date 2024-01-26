import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs'


@Injectable()
export class SidenavService {

  private sidenav!: MatSidenav;

  setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
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
