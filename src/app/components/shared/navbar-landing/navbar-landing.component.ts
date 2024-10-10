import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RouterLink } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-navbar-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-landing.component.html',
  styleUrls: ['./navbar-landing.component.css']
})
export class NavbarLandingComponent implements OnInit {
  isCollapsed = true;
  private lastPoppedUrl: string | undefined ;
  private yScrollStack: any[] = [];

  constructor(public location: Location, private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
         if (event.url != this.lastPoppedUrl) {
             this.yScrollStack.push(window.scrollY);
         }
     } else if (event instanceof NavigationEnd) {
         if (event.url == this.lastPoppedUrl) {
             this.lastPoppedUrl = undefined;
             window.scrollTo(0, this.yScrollStack.pop());
         } else {
             window.scrollTo(0, 0);
         }
     }
   });
   this.location.subscribe((ev:PopStateEvent) => {
       this.lastPoppedUrl = ev.url;
   });
  }

  login() {
    this.router.navigate(['/login']);
  }

  isHome() {
      var titlee = this.location.prepareExternalUrl(this.location.path());

      if( titlee === '#/home' ) {
          return true;
      }
      else {
          return false;
      }
  }
  isDocumentation() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if( titlee === '#/documentation' ) {
          return true;
      }
      else {
          return false;
      }
  }
}
