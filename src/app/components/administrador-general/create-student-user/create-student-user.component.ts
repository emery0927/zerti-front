import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

interface InstitutionsClasses {
  class: string;
}

interface ServicesTeam {
  team: string;
}

interface Departments {
  id: number;
  name: string;
}

interface Districts {
  id: number
  name: string;
}

interface VillageCenter {
  id: number;
  name: string;
}

@Component({
  selector: 'app-create-student-user',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatCheckboxModule],
  templateUrl: './create-student-user.component.html',
  styleUrls: ['./create-student-user.component.css']
})
export class CreateStudentUserComponent {
  selectedValue!: string;

  institutionsClasses: InstitutionsClasses[] = [
    {class: 'Oficial'},
    {class: 'No Oficial'},
  ];

  servicesTeam: ServicesTeam[] = [
    {team: 'Equipo 1'},
    {team: 'Equipo 2'},
  ];

  departments: Departments[] = [
    {id: 1, name: 'Antioquia'},
    {id: 2, name: 'Cundinamarca'},
    {id: 3, name: 'Huila'},
    {id: 4, name: 'La Guajira'},
    {id: 5, name: 'Magdalena'},
    {id: 6, name: 'Meta'},
    {id: 7, name: 'Nariño'},
    {id: 8, name: 'Putumayo'},
    {id: 9, name: 'Quindío'},
    {id: 10, name: 'Risaralda'},
    {id: 11, name: 'Santander'},
    {id: 12, name: 'Sucre'},
    {id: 13, name: 'Tolima'},
    {id: 14, name: 'Valle del Cauca'},
    {id: 15, name: 'Vaupes'},
    {id: 16, name: 'Vichada'},
  ];

  districts: Districts[] = [
    {id: 1, name: 'Medellín'},
    {id: 2, name: 'Bogotá'},
    {id: 3, name: 'Neiva'},
    {id: 4, name: 'Rioacha'},
    {id: 5, name: 'Santa Marta'},
    {id: 6, name: 'Villavicencio'},
    {id: 7, name: 'Pasto'},
    {id: 8, name: 'Mocoa'},
    {id: 9, name: 'Armenia'},
    {id: 10, name: 'Pereira'},
    {id: 11, name: 'Bucaramanga'},
    {id: 12, name: 'Sincelejo'},
    {id: 13, name: 'Ibagué'},
    {id: 14, name: 'Cali'},
    {id: 15, name: 'Mitú'},
    {id: 16, name: 'Puerto Carreño'},
  ]

  villageCenters: VillageCenter[] = [
    {id: 1, name: 'Centro Poblado 1'},
    {id: 2, name: 'Centro Poblado 2'},
    {id: 3, name: 'Centro Poblado 3'},
    {id: 4, name: 'Centro Poblado 4'},
  ]

}
