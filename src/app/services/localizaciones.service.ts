import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Departamento } from '../models/departamento';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './utils/http-service';
import { apiUrl } from 'src/environments/local';
import { AuthService } from './auth.service';
import { Municipio } from '../models/municipio';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionesService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getDepartamentos(): Observable<any> {
    console.log(this.authService.token$);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });

    console.log(headers);

    return this.http.get<Departamento[]>(apiUrl + '/api/departamentos/', {headers}).pipe(
      map((response: any[]) => response.map(depto => new Departamento(depto.uuid, depto.codigo, depto.nombre))));
  }

  getMunicipiosPorDepartamento(uuid: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    })
    return this.http.get<any>(apiUrl + '/api/departamentos/'+ uuid +'/municipios/', {headers}).pipe(
      map((response: any[]) => response.map(municipio => new Municipio(municipio.uuid, municipio.codigo, municipio.nombre))));

  }
}
