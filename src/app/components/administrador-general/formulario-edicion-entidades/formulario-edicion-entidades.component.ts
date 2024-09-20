import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-formulario-edicion-entidades',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatOptionModule, MatCardModule],
  templateUrl: './formulario-edicion-entidades.component.html',
  styleUrls: ['./formulario-edicion-entidades.component.css']
})
export class FormularioEdicionEntidadesComponent {

}
