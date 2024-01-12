import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  fillNav = ['1. Instituciones Educativas', '2.Entidades Territoriales', '3. Equipo de Servicios', '4. Usuarios', '5. Roles', '6. Estudiantes', '7. Libros Digitales'];

  fillerNav = Array.from({length: 8}, (_, i) => `1. Instituciones Educativas ${i + 1}`);

  fillerContent = Array.from({length: 8}, () => ``,);
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}

