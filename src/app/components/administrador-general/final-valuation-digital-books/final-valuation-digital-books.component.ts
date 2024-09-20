import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-final-valuation-digital-books',
  standalone: true,
  imports:[MatTabsModule, MatIconModule, MatSidenavModule],
  templateUrl: './final-valuation-digital-books.component.html',
  styleUrls: ['./final-valuation-digital-books.component.css']
})
export class FinalValuationDigitalBooksComponent {

}
