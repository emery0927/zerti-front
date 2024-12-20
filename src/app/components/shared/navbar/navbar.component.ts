import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatSidenavModule],
  providers: [SidenavService],
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
            this.cdr.detectChanges();
      if (res.nombre == "") {
        this.titulo_ventana = 'Administrador General';
      } else {
        this.titulo_ventana = res.nombre;
      }

    })
  }

}

