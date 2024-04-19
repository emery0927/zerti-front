import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/sidenav.service';

interface Page {
  id: number;
  link: string;
  name: string;
  icon: string;
}

interface User {
  id: number;
  rolId: number;
}

interface Menu {
  id: number;
  rolId: number;

}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [onSideNavChange, animateText]
})
export class SidebarComponent implements OnInit {

  public sideNavState: boolean = false;
  public linkText: boolean = false;
  rol!: number;
  pages!: Page[];


  public administrador_general: Page[] = [
    {id:1 ,name: 'Instituciones Educativas', link:'educational-institutions', icon: 'apartment'},
    {id:2 ,name: 'Usuarios Administrativos', link:'admin-users', icon: 'people'},
    {id:3 ,name: 'Usuarios Estudiantes', link:'students-users', icon: 'square_foot'},
    {id:4 ,name: 'Certificados de Estudio', link:'educational-certificates', icon: 'history_edu'},
    {id:5 ,name: 'Libros Digitales de Valoraciones Finales', link:'final-valuation-digital-books', icon: 'book_online'},
    {id:6 ,name: 'Libro Digital de Validaciones de Grado', link:'digital-grade-validation-book', icon: 'auto_stories'},
    {id:7 ,name: 'Libros de Graduación/Reconocimientos', link:'graduation-books', icon: 'book'},
    {id:8 ,name: 'Equipos de Servicio Zeti', link:'service-team', icon: 'support_agent'},
    {id:9 ,name: 'Entidades Territoriales', link:'territorial-entities', icon: 'travel_explore'},
    {id:10 ,name: 'Roles Operacionales', link:'operational-roles', icon: 'verified_user'},
    {id:11 ,name: 'Proveedores de Bienes y Servicios', link:'goods-and-services-suppliers', icon: 'handshake'},
  ]

  public gestion_operacional: Page[] = [
    {id:1 ,name: 'Creación de Certificados', link:'crear-certificado', icon: 'history_edu'},
    {id:2 ,name: 'Consulta de Libros', link:'consultar-libros', icon: 'book'},
  ]
  constructor(private _sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.rol = 1;

    if (this.rol === 1) {
      this.pages = this.administrador_general;
    } else if (this.rol === 2) {
      this.pages = this.gestion_operacional;
    }
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 100)
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }

}
