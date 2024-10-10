import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  constructor(private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
    this.token$ = this.tokenSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<AuthResponse>(apiUrl + '/api/token/', { username, password }, { headers })
    .pipe(
      tap(response => {
        this.setSession(response);
      })
    )
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem('access_token', authResult.access);
    localStorage.setItem('refresh_token', authResult.refresh);
    this.tokenSubject.next(authResult.access);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.tokenSubject.next(null);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<AuthResponse>(apiUrl + '/api/token/refresh/', { refresh: refreshToken })
    .pipe(
      tap(response => {
        this.setSession(response);
      })
    );
  }

  get token(): string | null {
    return this.tokenSubject.value;
  }
}
