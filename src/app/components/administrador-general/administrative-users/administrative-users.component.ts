import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { AdministrativeUsersManagementComponent } from '../administrative-users-management/administrative-users-management.component';
import { StudentUserManagementComponent } from '../student-user-management/student-user-management.component';


@Component({
  selector: 'app-administrative-users',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatTabsModule, AdministrativeUsersManagementComponent, StudentUserManagementComponent],
  templateUrl: './administrative-users.component.html',
  styleUrls: ['./administrative-users.component.css']
})
export class AdministrativeUsersComponent {

}
