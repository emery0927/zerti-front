import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-educational-certificates',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatTabsModule],
  templateUrl: './educational-certificates.component.html',
  styleUrls: ['./educational-certificates.component.css']
})
export class EducationalCertificatesComponent {

}
