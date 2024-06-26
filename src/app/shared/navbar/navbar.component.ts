import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public sideNavState: boolean = false;
  public linkText: boolean = false;

  titulo_ventana: string = "";

  @Input()
  sidenav!: MatSidenav;

  constructor(private _sidenavService: SidenavService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.titulo_ventana = 'Administrador General';
    this._sidenavService.buttonClick$.subscribe(res => {
      console.log(res.nombre);
      this.cdr.detectChanges();
      if (res.nombre == "") {
        this.titulo_ventana = 'Administrador General';
      } else {
        this.titulo_ventana = res.nombre;
      }
      console.log(this.titulo_ventana);

    })



  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 100)
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }

}

