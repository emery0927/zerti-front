import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InstitucionEducativa } from '../models/instititucion-educativa';
import { apiUrl } from 'src/environments/local';
import { catchError, map } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientosEducativosService {

  constructor(private http: HttpClient) { }

  getEstablecimientosEducativos() {
    return this.http.get<InstitucionEducativa[]>(apiUrl + '/establecimientos-educativos/').pipe(
      map((response: any[]) => response.map(colegio => new InstitucionEducativa(
        colegio.uuid, colegio.nombre,colegio.oficial, colegio.codigo_dane,
        colegio.nit, colegio.codigo_trd, colegio.direccion, colegio.correo,
        colegio.telefono, colegio.localizacion, colegio.modalidad, colegio.cerrado
      ))));
  }

  getEstablecimientoEducativoPorMunicipio(municipio: string): Observable<any> {
      return this.http.get<InstitucionEducativa[]>(apiUrl + '/establecimientos-educativos/', {params: { municipio: municipio}}).pipe(
        map((response: any[]) => response.map(colegio => new InstitucionEducativa(
          colegio.uuid, colegio.nombre, colegio.oficial, colegio.codigo_dane,
          colegio.nit, colegio.codigo_trd, colegio.direccion, colegio.correo,
          colegio.telefono, colegio.localizacion, colegio.modalidad, colegio.cerrado
        ))));
  }
}
