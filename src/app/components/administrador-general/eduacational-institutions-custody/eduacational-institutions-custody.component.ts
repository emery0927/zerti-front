import { Component } from '@angular/core';

export interface EducationalInstitutionsCustody {
  id: number;
  name: string;
  educationalInstitution: string;
}

const ELEMENT_DATA: EducationalInstitutionsCustody[] = [
  {id: 1, name: '', educationalInstitution: 'Liceo Departamental'},
  {id: 2, name: '', educationalInstitution: 'Liceo Departamental'},
  {id: 3, name: '', educationalInstitution: 'Liceo Departamental'},
  {id: 4, name: '', educationalInstitution: 'Liceo Departamental'},
  {id: 5, name: '', educationalInstitution: 'Liceo Departamental'},
  {id: 6, name: '', educationalInstitution: 'Liceo Departamental'},
];

@Component({
  selector: 'app-eduacational-institutions-custody',
  templateUrl: './eduacational-institutions-custody.component.html',
  styleUrls: ['./eduacational-institutions-custody.component.css']
})
export class EduacationalInstitutionsCustodyComponent {

  displayedColumns: string[] = ['name', 'options'];
  dataSource = ELEMENT_DATA;

}
