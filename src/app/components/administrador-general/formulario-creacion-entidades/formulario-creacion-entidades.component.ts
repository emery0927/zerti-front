import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-formulario-creacion-entidades',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, MatOptionModule],
  templateUrl: './formulario-creacion-entidades.component.html',
  styleUrls: ['./formulario-creacion-entidades.component.css']
})
export class FormularioCreacionEntidadesComponent {

}
