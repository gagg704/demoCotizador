import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class PostalCodeService {
    endPoint: string = environment.apiUrl + '/api/postalcode';
    http = inject( HttpClient );

    getPostalCodeByFilter( postalCode: any ):Observable <any>{
        return this.http.get( this.endPoint + '/' + postalCode + '/filter' );
    } 

    getPostalCodeById( id: any ):Observable <any>{
      return this.http.get( this.endPoint + '/' + id + '/byid' );
  } 

}