import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { BrowserModule } from "@angular/platform-browser";
import { NgxSpinnerModule } from "ngx-spinner";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdminUsersComponent } from "./components/administrador-general/admin-users/admin-users.component";
import { AdministrativeUsersManagementComponent } from "./components/administrador-general/administrative-users-management/administrative-users-management.component";
import { AdministrativeUsersComponent } from "./components/administrador-general/administrative-users/administrative-users.component";
import { AreasComponent } from "./components/administrador-general/areas/areas.component";
import { CrearSedeComponent } from "./components/administrador-general/crear-sede/crear-sede.component";
import { CreateEducationalInstituteComponent } from "./components/administrador-general/create-educational-institute/create-educational-institute.component";
import { CreateStudentUserComponent } from "./components/administrador-general/create-student-user/create-student-user.component";
import { DigitalGradeValidationBookComponent } from "./components/administrador-general/digital-grade-validation-book/digital-grade-validation-book.component";
import { EditEducationalInstitutionComponent } from "./components/administrador-general/edit-educational-institution/edit-educational-institution.component";
import { EditStudentUserComponent } from "./components/administrador-general/edit-student-user/edit-student-user.component";
import { EditarSedeComponent } from "./components/administrador-general/editar-sede/editar-sede.component";
import { EduacationalInstitutionsCustodyComponent } from "./components/administrador-general/eduacational-institutions-custody/eduacational-institutions-custody.component";
import { EducationalCertificatesComponent } from "./components/administrador-general/educational-certificates/educational-certificates.component";
import { EducationalInstitutionsManagementComponent } from "./components/administrador-general/educational-institutions-management/educational-institutions-management.component";
import { EducationalInstitutionsComponent } from "./components/administrador-general/educational-institutions/educational-institutions.component";
import { EntidadesTerritorialesComponent } from "./components/administrador-general/entidades-territoriales/entidades-territoriales.component";
import { EquiposServicioCreacionComponent } from "./components/administrador-general/equipos-servicio-creacion/equipos-servicio-creacion.component";
import { FinalValuationDigitalBooksComponent } from "./components/administrador-general/final-valuation-digital-books/final-valuation-digital-books.component";
import { FormularioCreacionEntidadesComponent } from "./components/administrador-general/formulario-creacion-entidades/formulario-creacion-entidades.component";
import { FormularioCreacionEquiposComponent } from "./components/administrador-general/formulario-creacion-equipos/formulario-creacion-equipos.component";
import { FormularioEdicionEntidadesComponent } from "./components/administrador-general/formulario-edicion-entidades/formulario-edicion-entidades.component";
import { FormularioEdicionEquiposComponent } from "./components/administrador-general/formulario-edicion-equipos/formulario-edicion-equipos.component";
import { GoodsAndServicesSuppliersComponent } from "./components/administrador-general/goods-and-services-suppliers/goods-and-services-suppliers.component";
import { GraduationBooksComponent } from "./components/administrador-general/graduation-books/graduation-books.component";
import { HomeComponent } from "./components/administrador-general/home/home.component";
import { ImageUploadComponent } from "./components/administrador-general/image-upload/image-upload.component";
import { NavbarComponent } from "./components/administrador-general/navbar/navbar.component";
import { OfficialsComponent } from "./components/administrador-general/officials/officials.component";
import { OperationalRolesComponent } from "./components/administrador-general/operational-roles/operational-roles.component";
import { RightSidebarComponent } from "./components/administrador-general/right-sidebar/right-sidebar.component";
import { SedesManagementComponent } from "./components/administrador-general/sedes-management/sedes-management.component";
import { SedesComponent } from "./components/administrador-general/sedes/sedes.component";
import { ServiceTeamComponent } from "./components/administrador-general/service-team/service-team.component";
import { SidebarComponent } from "./components/administrador-general/sidebar/sidebar.component";
import { StudentUserManagementComponent } from "./components/administrador-general/student-user-management/student-user-management.component";
import { StudentsUsersComponent } from "./components/administrador-general/students-users/students-users.component";
import { TerritorialEntitiesComponent } from "./components/administrador-general/territorial-entities/territorial-entities.component";
import { BubblePaginationDirective } from "./directives/bubble-pagination.directive";
import { StylePaginatorDirective } from "./directives/style-paginator.directive";
import { SidenavService } from "./services/sidenav.service";
import { FuncionariosComponent } from './components/administrador-general/funcionarios/funcionarios.component';
import { UsuariosAdministrativosComponent } from './components/administrador-general/usuarios-administrativos/usuarios-administrativos.component';
import { GestionCertificadosEstudioComponent } from './components/administrador-general/gestion-certificados-estudio/gestion-certificados-estudio.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    EducationalInstitutionsComponent,
    EducationalInstitutionsManagementComponent,
    OfficialsComponent,
    CreateEducationalInstituteComponent,
    ImageUploadComponent,
    AdminUsersComponent,
    EduacationalInstitutionsCustodyComponent,
    StudentsUsersComponent,
    AdministrativeUsersComponent,
    EducationalCertificatesComponent,
    AreasComponent,
    ServiceTeamComponent,
    FinalValuationDigitalBooksComponent,
    DigitalGradeValidationBookComponent,
    GraduationBooksComponent,
    TerritorialEntitiesComponent,
    OperationalRolesComponent,
    GoodsAndServicesSuppliersComponent,
    RightSidebarComponent,
    EditEducationalInstitutionComponent,
    StudentUserManagementComponent,
    EditStudentUserComponent,
    CreateStudentUserComponent,
    AdministrativeUsersManagementComponent,
    SedesComponent,
    SedesManagementComponent,
    EditarSedeComponent,
    CrearSedeComponent,
    EntidadesTerritorialesComponent,
    EquiposServicioCreacionComponent,
    FormularioCreacionEquiposComponent,
    FormularioEdicionEquiposComponent,
    FormularioEdicionEntidadesComponent,
    FormularioCreacionEntidadesComponent,
    FuncionariosComponent,
    UsuariosAdministrativosComponent,
    GestionCertificadosEstudioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    MatSortModule,
    NgxSpinnerModule,
    BubblePaginationDirective,
    FormsModule,
    StylePaginatorDirective,
    MatTreeModule,
  ],
  providers: [SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
