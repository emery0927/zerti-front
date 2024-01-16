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
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    EducationalInstitutionsComponent
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
    MatDividerModule
  ],
  providers: [SidenavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
