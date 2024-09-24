import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-students-users',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatTabsModule],
  templateUrl: './students-users.component.html',
  styleUrls: ['./students-users.component.css']
})
export class StudentsUsersComponent {

}
