import { Component } from '@angular/core';

export interface TerritorialEntitiesFilter {
  name:string;
  options:string[];
  defaultValue:string;
}

@Component({
  selector: 'app-educational-institutions',
  templateUrl: './educational-institutions.component.html',
  styleUrls: ['./educational-institutions.component.css']
})
export class EducationalInstitutionsComponent {

  territorialEntities: string[]=['Todas', 'Santiago de Cali', 'Valle del Cauca', 'Jamundí'];
  territorialEntitiesFilter: TerritorialEntitiesFilter[]=[];

}
