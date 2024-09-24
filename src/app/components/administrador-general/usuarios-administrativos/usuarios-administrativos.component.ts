import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-usuarios-administrativos',
  standalone: true,
  imports: [MatSidenavModule, MatTabsModule, MatIconModule],
  templateUrl: './usuarios-administrativos.component.html',
  styleUrls: ['./usuarios-administrativos.component.css']
})
export class UsuariosAdministrativosComponent {

}
