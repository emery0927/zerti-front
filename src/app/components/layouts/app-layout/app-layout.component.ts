import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { RightSidebarComponent } from '../../shared/right-sidebar/right-sidebar.component';
import { filter } from 'rxjs';
import { SidenavService } from 'src/app/services/sidenav.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { onMainContentChange } from 'src/app/animations/animations';
import { RecargaDirective } from 'src/app/directives/recarga.directive';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, RouterModule, NavbarComponent, SidebarComponent, RightSidebarComponent, RecargaDirective],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
  animations: [onMainContentChange, trigger('sidenavAnimation', [
    state('open', style({
      transform: 'translateX(0)',
    })),
    state('closed', style({
      transform: 'translateX(-100%)',
    })),
    transition('closed <=> open', animate('900ms ease-in')),
  ]),
],
})
export class AppLayoutComponent implements AfterViewInit, OnInit {
  public onSideNavChange!: boolean;
  public inicioSesion = false;
  public showRightSidebar = false;
  recarga: number = 0;
  rol!: number;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private sidenavService: SidenavService, private router: Router) {
    
    this.sidenavService.sideNavState$.subscribe( res=> {
      this.onSideNavChange = res;
    });
  }
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      
      this.evaluateSidebarVisibility(event.urlAfterRedirects);
    });

  }



  evaluateSidebarVisibility(currentRoute: string) {
    const routesWithoutSidebar = ['/login', '/landing'];
    this.showRightSidebar = !routesWithoutSidebar.includes(currentRoute);
  }

  isLanding(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/landing';
  }

  isLogin(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/login';
  }

  isHome(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/home';
  }

  cerrarSidenavDerecho() {
    this.sidenavService.cerrarSidenav();
  }

  ngAfterViewInit(): void {
    if (this.sidenav) {
      this.sidenavService.setSidenav(this.sidenav);
      console.warn('Sidenav inicializado');
    } else {
      console.error('Sidenav no inicializado');
    }
  }
}
