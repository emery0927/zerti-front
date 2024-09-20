import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-formulario-creacion-equipos',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatSelectModule, MatOptionModule, MatCheckboxModule],
  templateUrl: './formulario-creacion-equipos.component.html',
  styleUrls: ['./formulario-creacion-equipos.component.css']
})
export class FormularioCreacionEquiposComponent {

}
