import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-digital-grade-validation-book',
  standalone: true,
  imports: [MatTabsModule, MatIconModule, MatSidenavModule],
  templateUrl: './digital-grade-validation-book.component.html',
  styleUrls: ['./digital-grade-validation-book.component.css']
})
export class DigitalGradeValidationBookComponent {

}
