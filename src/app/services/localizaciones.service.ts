import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Departamento } from '../models/departamento';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get<Departamento[]>(apiUrl + '/departamentos/').pipe(
      map((response: any[]) => response.map(depto => new Departamento(depto.uuid, depto.codigo, depto.nombre))));
  }

  getMunicipiosPorDepartamento(uuid: string): Observable<any> {
    return this.http.get<any>(apiUrl + '/departamentos/'+ uuid +'/municipios/').pipe(
      map((response: any[]) => response.map(municipio => new Municipio(municipio.uuid, municipio.codigo, municipio.nombre))));

  }
}
