import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-administrative-users',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatTabsModule],
  templateUrl: './administrative-users.component.html',
  styleUrls: ['./administrative-users.component.css']
})
export class AdministrativeUsersComponent {

}
