import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { animateText, onSideNavChange } from 'src/app/animations/animations';
import { CreateEducationalInstituteComponent } from 'src/app/components/administrador-general/create-educational-institute/create-educational-institute.component';
import { InicioGestionOperacionalComponent } from 'src/app/components/gestion-operacional-ieo/inicio-gestion-operacional/inicio-gestion-operacional.component';
import { SeleccionarInstitucionComponent } from 'src/app/components/gestion-operacional-ieo/seleccionar-institucion/seleccionar-institucion.component';
import { VentanaTrabajo } from 'src/app/models/ventana-trabajo';
import { SidenavService } from 'src/app/services/sidenav.service';

interface Rol {
  id: number;
  link: string;
  name: string;
  rol: string;
  icon: string;
}
@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
  animations: []
})
export class RightSidebarComponent implements OnInit {

  isCollapsed = true;

  @Input()
  sidenav!: MatSidenav;

  @Input()
  rol!: number;

  role$!: Observable<Rol>;

  ventanaTrabajo!: VentanaTrabajo;

  selectedItem!: string;

  public roles: Rol[] = [
    {id:1 ,name: 'Administracion General', rol: 'Administrador General', link:'home', icon: 'admin_panel_settings'},
    {id:2 ,name: 'Gestión Operacional IE', rol: 'Rectoría', link:'inicio-gestion-operacional', icon: 'school'},
    {id:3 ,name: 'Gestión Operacional ET', rol: 'Gestión Documental', link:'consultar-libros', icon: 'account_balance'},
    {id:4 ,name: 'Operador de Servicios Zerti', rol: 'Digitalización de Libros', link:'consultar-libros', icon: 'support_agent'},
    {id:5 ,name: 'Proveedor de Bienes y Servicios', rol: 'Proveedor de Bienes y Servicios', link:'consultar-libros', icon: 'local_shipping'},
  ]


  constructor(private sidenavService: SidenavService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
     this.setSelectedItemFromRoute();
     console.log(this.role$);
  }

  setSelectedItemFromRoute() {
    const currentUrl = this.router.url;
    this.selectedItem = currentUrl.substring(1);
  }

  selectItem(item: string) {
    this.selectedItem = item;
    this.router.navigateByUrl('/' + item);
    localStorage.setItem('selectedItem', item);
  }

  closeSidenav() {
    this.sidenavService.cerrarSidenav();
  }

  elegirContexto(rol: number) {
    if (rol === 1) {
    this.ventanaTrabajo = new VentanaTrabajo(rol, rol, 'Administrador General');
    this.sidenavService.cargarVentanasRolAdmin(this.ventanaTrabajo);
    this.router.navigate(['home'])
    } else if (rol === 2) {
      this.router.navigate(['inicio-gestion-operacional']);
    }
  }

  openClientSelectionDialog(role: Rol) {

    console.log(this.role$);

    if (role.id === 1) {
      this.elegirContexto(role.id);

      this.closeSidenav();
    } else {
      const dialogRef = this.dialog.open(SeleccionarInstitucionComponent, {
        minWidth: 870,
        data: {role: role},
        disableClose: true,
        restoreFocus: true
      });
      dialogRef.afterClosed().subscribe(() => {
        this.elegirContexto(role.id);
        this.closeSidenav();
      })
      //dialogRef.afterClosed().subscribe((clientId: number) => {
    //     this.toogleOffSettings();

    //     if (clientId === MANAGEMENT) {
    //       this,changeWorkspace(role, { client: null});
    //     } else if (clientId) {
    //       this._clientService.getBaseConfigByClientId(clientId).subscribe(
    //       (config: BaseConfig) => {
    //         this.changeWorkspace(role, config);
    //       },
    //       () => {
    //         this._toastrService.error(
    //           'No se ha podido seleccionar la <b>Institución Educativa</b>.',
    //           '¡Error!'
    //         );
    //       }
    //     );
    //     }
     // });

    }

  }

  // changeWorkspace(role: Role, config: BaseConfig): void {
  //   this._clientService.configure(config);

  //   const redirectUrl =
  //     this._permissionService.role.id != role.id ? WebUrl.DASHBOARD : undefined;
  //   this._permissionService.configure(role);

  //   this.reloadPage(redirectUrl);
  //   this._toastrService.info('Actualización realizada con éxito.', '¡Genial!');
  // }

  // toggleOffSettings(): void {
  //   this._navigationService.toggleOffSettings();
  // }

  // reloadPage(redirectUrl?: string): void {
  //   this._navigationService.reloadPage(redirectUrl);
  // }

  goTo(url: string): void {
    // this.toggleOffSettings();
    this.router.navigate([url]);
  }

  async cargarVentanaRol() {
    this.sidenavService.cargarVentanasRolAdmin(this.ventanaTrabajo);
  }
}
