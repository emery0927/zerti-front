import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavbarComponent } from './components/navbar/navbar.component'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SidenavService } from './services/sidenav.service';
import { HomeComponent } from './components/home/home.component';
import { EducationalInstitutionsComponent } from './components/educational-institutions/educational-institutions.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EducationalInstitutionsManagementComponent } from './components/educational-institutions-management/educational-institutions-management.component';
import { OfficialsComponent } from './components/officials/officials.component';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateEducationalInstituteComponent } from './components/create-educational-institute/create-educational-institute.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { EduacationalInstitutionsCustodyComponent } from './components/eduacational-institutions-custody/eduacational-institutions-custody.component';
import { StudentsUsersComponent } from './components/students-users/students-users.component';
import { AdministrativeUsersComponent } from './components/administrative-users/administrative-users.component';
import { EducationalCertificatesComponent } from './components/educational-certificates/educational-certificates.component';
import { AreasComponent } from './components/areas/areas.component';
import { ServiceTeamComponent } from './components/service-team/service-team.component';
import { FinalValuationDigitalBooksComponent } from './components/final-valuation-digital-books/final-valuation-digital-books.component';
import { DigitalGradeValidationBookComponent } from './components/digital-grade-validation-book/digital-grade-validation-book.component';
import { GraduationBooksComponent } from './components/graduation-books/graduation-books.component';
import { TerritorialEnttitiesComponent } from './components/territorial-enttities/territorial-enttities.component';
import { TerritorialEntitiesComponent } from './components/territorial-entities/territorial-entities.component';
import { OperationalRolesComponent } from './components/operational-roles/operational-roles.component';
import { GoodsAndServicesSuppliersComponent } from './components/goods-and-services-suppliers/goods-and-services-suppliers.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
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
    TerritorialEnttitiesComponent,
    TerritorialEntitiesComponent,
    OperationalRolesComponent,
    GoodsAndServicesSuppliersComponent,
    RightSidebarComponent,
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
  ],
  providers: [SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
