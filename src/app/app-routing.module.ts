import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrativeUsersComponent } from './components/administrador-general/administrative-users/administrative-users.component';
import { AreasComponent } from './components/administrador-general/areas/areas.component';
import { DigitalGradeValidationBookComponent } from './components/administrador-general/digital-grade-validation-book/digital-grade-validation-book.component';
import { EducationalCertificatesComponent } from './components/administrador-general/educational-certificates/educational-certificates.component';
import { EducationalInstitutionsComponent } from './components/administrador-general/educational-institutions/educational-institutions.component';
import { FinalValuationDigitalBooksComponent } from './components/administrador-general/final-valuation-digital-books/final-valuation-digital-books.component';
import { GoodsAndServicesSuppliersComponent } from './components/administrador-general/goods-and-services-suppliers/goods-and-services-suppliers.component';
import { GraduationBooksComponent } from './components/administrador-general/graduation-books/graduation-books.component';
import { HomeComponent } from './components/administrador-general/home/home.component';
import { OperationalRolesComponent } from './components/administrador-general/operational-roles/operational-roles.component';
import { ServiceTeamComponent } from './components/administrador-general/service-team/service-team.component';
import { StudentsUsersComponent } from './components/administrador-general/students-users/students-users.component';
import { TerritorialEntitiesComponent } from './components/administrador-general/territorial-entities/territorial-entities.component';
import { UsuariosAdministrativosComponent } from './components/administrador-general/usuarios-administrativos/usuarios-administrativos.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'educational-institutions', component: EducationalInstitutionsComponent },
  { path: 'students-users', component: StudentsUsersComponent },
  { path: 'admin-users', component: UsuariosAdministrativosComponent },
  { path: 'areas', component: AreasComponent },
  { path: 'digital-grade-validation-book', component: DigitalGradeValidationBookComponent },
  { path: 'educational-certificates', component: EducationalCertificatesComponent },
  { path: 'final-valuation-digital-books', component: FinalValuationDigitalBooksComponent },
  { path: 'goods-and-services-suppliers', component: GoodsAndServicesSuppliersComponent },
  { path: 'graduation-books', component: GraduationBooksComponent },
  { path: 'operational-roles', component: OperationalRolesComponent },
  { path: 'service-team', component: ServiceTeamComponent },
  { path: 'territorial-entities', component: TerritorialEntitiesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
