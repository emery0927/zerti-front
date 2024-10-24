import { CommonModule, JsonPipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/models/auth/user.model';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar,MatSnackBarModule} from '@angular/material/snack-bar';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { NavbarLandingComponent } from '../shared/navbar-landing/navbar-landing.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, RouterModule, ReactiveFormsModule, CommonModule, MatSnackBarModule, NavbarLandingComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  errorMessage: string | null = null;
  focus: any;
  focus1: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
   }

  ngOnInit() {}

  login(): void {
    if (this.authForm.valid) {
      const { username, password } = this.authForm.value;
      this.authService.login(username, password).subscribe({
        next: (respuesta) => {
          const tokenPayload: JwtPayload = jwtDecode(respuesta.access);
          const jsonDecoded = JSON.stringify(tokenPayload);
          const parsedDecode = JSON.parse(jsonDecoded);
          this.authService.setUuid(parsedDecode.user_id);
          this.router.navigate(['app/home']);
        },
        error: (err) => {
          this.errorMessage = 'Error de autenticación. Por favor, verifica tus credenciales.';
          this.showError(this.errorMessage);
          console.error(this.errorMessage);
        }
      });
    }
  }

  showError(mensaje: string) {
    this.snackBar.open(mensaje, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['error-snackbar']
    });
  }
}

