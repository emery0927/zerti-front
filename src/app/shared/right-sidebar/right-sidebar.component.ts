import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { animateText, onSideNavChange } from 'src/app/animations/animations';
import { CreateEducationalInstituteComponent } from 'src/app/components/administrador-general/create-educational-institute/create-educational-institute.component';
import { SeleccionarInstitucionComponent } from 'src/app/components/gestion-operacional-ieo/seleccionar-institucion/seleccionar-institucion.component';
import { VentanaTrabajo } from 'src/app/models/ventana-trabajo';
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

  @Input()
  rol!: number;

  ventanaTrabajo!: VentanaTrabajo;


  constructor(private sidenavService: SidenavService, private router: Router, public dialog: MatDialog) { }

  closeSidenav() {
    this.sidenavService.cerrarSidenav();
  }

  elegirContexto(rol: number) {
    const dialogRef = this.dialog.open(SeleccionarInstitucionComponent, {disableClose: false});
    if (rol === 1) {
      this.ventanaTrabajo = new VentanaTrabajo(rol, rol, 'Administrador General');
    } else if (rol === 2) {
      this.ventanaTrabajo = new VentanaTrabajo(rol, rol, 'Gestión Operacional');
    }

    this.sidenavService.cargarVentanasRolAdmin(this.ventanaTrabajo);
  }
}
