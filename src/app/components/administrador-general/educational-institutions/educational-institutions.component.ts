import { Component } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { FuncionariosComponent } from '../funcionarios/funcionarios.component';
import { EduacationalInstitutionsCustodyComponent } from '../eduacational-institutions-custody/eduacational-institutions-custody.component';
import { EducationalInstitutionsManagementComponent } from '../educational-institutions-management/educational-institutions-management.component';
import { CommonModule } from '@angular/common';

export interface TerritorialEntitiesFilter {
  name:string;
  options:string[];
  defaultValue:string;
}

@Component({
  selector: 'app-educational-institutions',
  standalone: true,
  imports: [MatFormFieldModule,
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    FuncionariosComponent,
    EduacationalInstitutionsCustodyComponent,
    EducationalInstitutionsManagementComponent,
    CommonModule],
  templateUrl: './educational-institutions.component.html',
  styleUrls: ['./educational-institutions.component.css']
})
export class EducationalInstitutionsComponent {

  territorialEntities: string[]=['Todas', 'Santiago de Cali', 'Valle del Cauca', 'Jamundí'];
  territorialEntitiesFilter: TerritorialEntitiesFilter[]=[];

}
