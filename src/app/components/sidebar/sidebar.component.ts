import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from '../../animations/animations'
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

  public pages: Page[] = [
    {id:1 ,name: 'Instituciones Educativas', link:'educational-institutions', icon: 'apartment'},
    {id:2 ,name: 'Usuarios Estudiantes', link:'students-users', icon: 'square_foot'},
    {id:3 ,name: 'Usuarios Administrativos', link:'admin-users', icon: 'people'},
    {id:4 ,name: 'Certificados de Estudio', link:'educational-certificates', icon: 'history_edu'},
    {id:5 ,name: 'Libros Digitales de Valoraciones Finales', link:'final-valuation-digital-books', icon: 'book_online'},
    {id:6 ,name: 'Libro Digital de Validaciones de Grado', link:'digital-grade-validation-book', icon: 'class'},
    {id:7 ,name: 'Libros de Graduación/Reconocimientos', link:'graduation-books', icon: 'book'},
    {id:8 ,name: 'Áreas - Asignaturas/Especialidades', link:'areas', icon: 'star_rate'},
    {id:9 ,name: 'Equipos de Servicio Zeti', link:'service-team', icon: 'support_agent'},
    {id:10 ,name: 'Entidades Territoriales', link:'territorial-entities', icon: 'travel_explore'},
    {id:11 ,name: 'Roles Operacionales', link:'operational-roles', icon: 'verified_user'},
    {id:12 ,name: 'Proveedores de Bienes y Servicios', link:'goods-and-services-suppliers', icon: 'handshake'},
  ]
  constructor(private _sidenavService: SidenavService) { }

  ngOnInit(): void {
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 100)
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }

}
