import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const endPoint: string = environment.apiUrl + '/api/cotizador/';

@Injectable({
  providedIn: 'root'
})

export class CotizadorService {
  
  constructor( private http: HttpClient ) {}
  
  saveEmployee(employee: any): Observable<any> { /* Guarda el empleado */ 
    return this.http.post<any>(endPoint + 'employee', employee);
  }

  editPermission(permission: any): Observable<any> { /* Edita el status del permiso */ 
    return this.http.post<any>(endPoint + 'updatestatus', permission);
  }
  
  getEmployee(id: number): Observable<any> { /* Edita el status del permiso */ 
    return this.http.get<any>(endPoint + 'employee/byid/'+ id);
  }

  getCucop(): Observable<any> { /* Obtiene el listado de claves cucop */
    return this.http.get( endPoint + 'cucop');
  }  
  
}
