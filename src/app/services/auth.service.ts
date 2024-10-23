import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from 'src/environments/local';
import { AuthResponse } from '../models/auth/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  public token$: Observable<string | null>;
  private uuid!: string;

  constructor(private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
    this.token$ = this.tokenSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
      return this.http.post<AuthResponse>(apiUrl + '/token/', { username, password })
    .pipe(
      tap(response => {
        this.storeTokens(response);
      })
    )
  }

  storeTokens(tokens: any): void {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  }

  cargarUsuario(uuid: string): Observable<any> {
    return this.http.get<Usuario>(apiUrl + '/usuarios/' + uuid + '/');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  refreshToken(): Observable<string> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<AuthResponse>(`${apiUrl}/token/refresh/`, { refresh: refreshToken })
    .pipe(
      tap(response => {
        this.storeTokens(response);
      }),
      map(tokens => tokens.access), // Extrae y retorna el nuevo token de acceso
      catchError(error => {
        console.error('Error al refrescar el token:', error);
        return throwError(() => error); // Manejo de errores
      })
    );
  }

  isRefreshing(): boolean {
    return!!this.getRefreshToken();
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  get token(): string | null {
    return this.tokenSubject.value;
  }

  setUuid(uuid: string): void {
    this.uuid = uuid;
  }

  getUuid(): string {
    return this.uuid;
  }
}
