import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const endPoint: string = environment.apiUrl + '/api/modules';

@Injectable({
  providedIn: 'root',
})

export class ModuleService {
    http = inject( HttpClient );

    getModulesbyRole( roleId: number ): Observable<any> {
      return this.http.get<any>( endPoint + '/' + roleId );
    }
       
}