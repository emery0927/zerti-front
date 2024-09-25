import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { AdministrativeUsersManagementComponent } from '../administrative-users-management/administrative-users-management.component';
import { StudentUserManagementComponent } from '../student-user-management/student-user-management.component';

@Component({
  selector: 'app-usuarios-administrativos',
  standalone: true,
  imports: [MatSidenavModule, MatTabsModule, MatIconModule, AdministrativeUsersManagementComponent, StudentUserManagementComponent],
  templateUrl: './usuarios-administrativos.component.html',
  styleUrls: ['./usuarios-administrativos.component.css']
})
export class UsuariosAdministrativosComponent {

}
