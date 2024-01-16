import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from '../../animations/animations'
import { SidenavService } from 'src/app/services/sidenav.service';

interface Page {
  id: number;
  link: string;
  name: string;
  icon: string;
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
    {id:1 ,name: 'Instituciones Educativas', link:'instituciones', icon: 'apartment'},
    {id:2 ,name: 'Usuarios Estudiantes', link:'home', icon: 'square_foot'},
    {id:3 ,name: 'Usuarios Administrativos', link:'some-link', icon: 'people'},
    {id:4 ,name: 'Certificados de Estudio', link:'some-link', icon: 'history_edu'},
    {id:5 ,name: 'Libros Digitales de Valoraciones Finales', link:'some-link', icon: 'book_online'},
    {id:6 ,name: 'Libro Digital de Validaciones de Grado', link:'some-link', icon: 'class'},
    {id:7 ,name: 'Libros de Graduación/Reconocimientos', link:'some-link', icon: 'book'},
    {id:8 ,name: 'Áreas - Asignaturas/Especialidades', link:'some-link', icon: 'star_rate'},
    {id:9 ,name: 'Equipos de Servicio Zeti', link:'some-link', icon: 'support_agent'},
    {id:10 ,name: 'Entidades Territoriales', link:'some-link', icon: 'travel_explore'},
    {id:11 ,name: 'Roles Operacionales', link:'some-link', icon: 'verified_user'},
    {id:12 ,name: 'Proveedores de Bienes y Servicios', link:'some-link', icon: 'handshake'},
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
