import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  public inicioSesion = true;
  recarga: number = 0;
  rol!: number;

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  constructor(private sidenavService: SidenavService) {
    console.log(this.sidenavService.sideNavState$.subscribe( res=> {
      this.onSideNavChange = res;
    }))
  }
  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
