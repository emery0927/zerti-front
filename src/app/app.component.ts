import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarLandingComponent } from './components/shared/navbar-landing/navbar-landing.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { RightSidebarComponent } from './components/shared/right-sidebar/right-sidebar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { RecargaDirective } from './directives/recarga.directive';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    LandingComponent,
    NavbarLandingComponent,
    SidebarComponent,
    RightSidebarComponent,
    NavbarComponent,
    RecargaDirective,
    LoginComponent
  ],
  providers: [SidenavService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
export class AppComponent implements AfterViewInit, OnInit {
  title = 'zerti';
  public onSideNavChange!: boolean;
  public inicioSesion = false;
  public showRightSidebar = false;
  recarga: number = 0;
  rol!: number;

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  constructor(private sidenavService: SidenavService, private router: Router) {
    this.sidenavService.sideNavState$.subscribe( res=> {
      this.onSideNavChange = res;
    });


    console.log(this.showRightSidebar);


  }
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      console.log('Navigation Event:', event);

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
