import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ConsultarLibrosComponent } from '../../gestion-operacional-ieo/consultar-libros/consultar-libros.component';
import { ConsultarLibrosFinalesComponent } from '../consultar-libros-finales/consultar-libros-finales.component';
import { PaginasFoliosComponent } from '../paginas-folios/paginas-folios.component';
import { LibrosAnnioLectivoComponent } from '../libros-annio-lectivo/libros-annio-lectivo.component';

@Component({
  selector: 'app-final-valuation-digital-books',
  standalone: true,
  imports:[MatTabsModule, MatIconModule, MatSidenavModule, ConsultarLibrosFinalesComponent, PaginasFoliosComponent, LibrosAnnioLectivoComponent],
  templateUrl: './final-valuation-digital-books.component.html',
  styleUrls: ['./final-valuation-digital-books.component.css']
})
export class FinalValuationDigitalBooksComponent {

}
