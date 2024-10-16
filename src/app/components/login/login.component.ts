import { CommonModule, JsonPipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/models/auth/user.model';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar,MatSnackBarModule} from '@angular/material/snack-bar';
import { jwtDecode, JwtPayload } from 'jwt-decode';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, RouterModule, ReactiveFormsModule, CommonModule, MatSnackBarModule],
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
      console.log(this.authService.login(username, password).subscribe({
        next: (respuesta) => {
          console.log(respuesta);

          this.router.navigate(['/home']);
          this.cargarUsuario(respuesta.access);
        },
        error: (err) => {
          this.errorMessage = 'Error de autenticación. Por favor, verifica tus credenciales.';
          this.showError(this.errorMessage);
          console.error(this.errorMessage);
        }
      }));
    }
  }

  cargarUsuario(accessToken: string): void {
    console.log(accessToken);
    const tokenPayload: JwtPayload = jwtDecode(accessToken);
    const jsonDecoded = JSON.stringify(tokenPayload);
    const parsedDecode = JSON.parse(jsonDecoded);
    console.log(parsedDecode);

    this.authService.cargarUsuario(parsedDecode.user_id).subscribe({
      next: (usuario) => {
        console.log(usuario);
      },
      error: (err) => {
        console.error(err);
      }
    })

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

