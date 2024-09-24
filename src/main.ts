/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { AreasComponent } from './app/components/administrador-general/areas/areas.component';
import { DigitalGradeValidationBookComponent } from './app/components/administrador-general/digital-grade-validation-book/digital-grade-validation-book.component';
import { EducationalCertificatesComponent } from './app/components/administrador-general/educational-certificates/educational-certificates.component';
import { EducationalInstitutionsComponent } from './app/components/administrador-general/educational-institutions/educational-institutions.component';
import { FinalValuationDigitalBooksComponent } from './app/components/administrador-general/final-valuation-digital-books/final-valuation-digital-books.component';
import { GoodsAndServicesSuppliersComponent } from './app/components/administrador-general/goods-and-services-suppliers/goods-and-services-suppliers.component';
import { GraduationBooksComponent } from './app/components/administrador-general/graduation-books/graduation-books.component';
import { HomeComponent } from './app/components/administrador-general/home/home.component';
import { OperationalRolesComponent } from './app/components/administrador-general/operational-roles/operational-roles.component';
import { ServiceTeamComponent } from './app/components/administrador-general/service-team/service-team.component';
import { StudentsUsersComponent } from './app/components/administrador-general/students-users/students-users.component';
import { TerritorialEntitiesComponent } from './app/components/administrador-general/territorial-entities/territorial-entities.component';
import { UsuariosAdministrativosComponent } from './app/components/administrador-general/usuarios-administrativos/usuarios-administrativos.component';
import { InicioGestionOperacionalComponent } from './app/components/gestion-operacional-ieo/inicio-gestion-operacional/inicio-gestion-operacional.component';
import { LandingComponent } from './app/components/landing/landing.component';
import { LoginComponent } from './app/components/login/login.component';
import { PasswordRecoveryComponent } from './app/components/password-recovery/password-recovery.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
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
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'inicio-gestion-operacional', component: InicioGestionOperacionalComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule)
  ]
}).catch(err => console.error(err));
