import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-service-team',
  standalone: true,
  imports: [MatSidenavModule, MatTabsModule, MatIconModule],
  templateUrl: './service-team.component.html',
  styleUrls: ['./service-team.component.css']
})
export class ServiceTeamComponent {

}
