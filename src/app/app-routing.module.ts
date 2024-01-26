import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EducationalInstitutionsComponent } from './components/educational-institutions/educational-institutions.component';
import { StudentsUsersComponent } from './components/students-users/students-users.component';
import { AdministrativeUsersComponent } from './components/administrative-users/administrative-users.component';
import { AreasComponent } from './components/areas/areas.component';
import { DigitalGradeValidationBookComponent } from './components/digital-grade-validation-book/digital-grade-validation-book.component';
import { EducationalCertificatesComponent } from './components/educational-certificates/educational-certificates.component';
import { FinalValuationDigitalBooksComponent } from './components/final-valuation-digital-books/final-valuation-digital-books.component';
import { GoodsAndServicesSuppliersComponent } from './components/goods-and-services-suppliers/goods-and-services-suppliers.component';
import { GraduationBooksComponent } from './components/graduation-books/graduation-books.component';
import { OperationalRolesComponent } from './components/operational-roles/operational-roles.component';
import { ServiceTeamComponent } from './components/service-team/service-team.component';
import { TerritorialEntitiesComponent } from './components/territorial-entities/territorial-entities.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'educational-institutions', component: EducationalInstitutionsComponent },
  { path: 'students-users', component: StudentsUsersComponent },
  { path: 'admin-users', component: AdministrativeUsersComponent },
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
