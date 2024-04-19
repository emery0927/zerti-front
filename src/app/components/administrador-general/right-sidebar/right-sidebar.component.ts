import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { animateText, onSideNavChange } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
  animations: []
})
export class RightSidebarComponent {

  @Input()
  sidenav!: MatSidenav;


  constructor(private _sidenavService: SidenavService) { }

  closeSidenav() {
    this._sidenavService.cerrarSidenav();
  }

  elegirContexto() {
  }
}
