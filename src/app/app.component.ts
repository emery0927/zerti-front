import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarLandingComponent } from './shared/navbar-landing/navbar-landing.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { RightSidebarComponent } from './shared/right-sidebar/right-sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RecargaDirective } from './directives/recarga.directive';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LoginComponent } from './components/login/login.component';

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
export class AppComponent implements AfterViewInit {
  title = 'zerti';
  public onSideNavChange!: boolean;
  public inicioSesion = false;
  recarga: number = 0;
  rol!: number;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private sidenavService: SidenavService, private router: Router) {}

  isLanding(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/landing';
  }

  isLogin(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/login';
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
