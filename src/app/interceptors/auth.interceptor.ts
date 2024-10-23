import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor ejecutado');
    const token = this.authService.getToken();
    console.log(token);
     // Obtener el token

    // Si existe un token, clona la solicitud y agrega el encabezado 'Authorization'
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Continuar con la solicitud, ya sea clonada o no
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error en la respuesta:', error);
        // Si el error es 401, intenta refrescar el token
        if (error.status === 401) {
          console.log(this.authService.refreshToken());
          return this.authService.refreshToken().pipe(
            switchMap((newToken: string) => {
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next.handle(newReq);
            }),
            catchError(err => {
              // Si falla la actualización del token, hacer logout y redirigir al login
              this.authService.logout();
              this.router.navigate(['/login']);
              return throwError(() => err);
            })
          );
        }

        // Si no es 401, lanzar el error
        return throwError(() => error);
      })
    );
  }
}
