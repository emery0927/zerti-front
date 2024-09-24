import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-operational-roles',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatTabsModule],
  templateUrl: './operational-roles.component.html',
  styleUrls: ['./operational-roles.component.css']
})
export class OperationalRolesComponent {

}
