import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-territorial-entities',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatTabsModule],
  templateUrl: './territorial-entities.component.html',
  styleUrls: ['./territorial-entities.component.css']
})
export class TerritorialEntitiesComponent {

}
