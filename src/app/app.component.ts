import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
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
}) export class AppComponent implements AfterViewInit {
  title = 'zerti';
  public onSideNavChange!: boolean;
  public inicioSesion = false;
  recarga: number = 0;
  rol!: number;

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  constructor(private sidenavService: SidenavService, private router: Router) {
    console.log(this.sidenavService.sideNavState$.subscribe( res=> {
      this.onSideNavChange = res;
    }))
  }

  isLandingOrLogin(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/landing' || currentRoute === '/login';
  }
  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
