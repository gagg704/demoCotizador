import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from './user.interface';
import { environment } from '../../../../environments/environment';

const endPoint: string = environment.apiUrl + '/api/users';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  
  constructor( private http: HttpClient ) {}

  getAll(size: number, page: number, search: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("size", size);
    params = params.append("page", page);
    params = params.append("search", search);
  
    return this.http.get( endPoint, { params: params } );
  }
  
  getAllRoles(): Observable<any> {
    return this.http.get( endPoint + '/roles' );
  }

  getUser(userId: number): Observable<any> {
    return this.http.get( endPoint + '/' + userId + '/user');
  }  

  create(userData: UserInterface): Observable<any> {
    return this.http.post<any>( endPoint, userData );
  }

  resetPassword( params: any ) {
    return this.http.post<any>( endPoint + '/resetpassword' , params);
  }

  delete(userId: number): Observable<any> {
    return this.http.delete( endPoint + '/' + userId );
  }

  checkUsername( username: any ):Observable <any>{
    let params = new HttpParams();
    params = params.append("username", username);
    return this.http.get( endPoint + '/checkusername', { params: params } );
  }

  checkEmail( email: any ):Observable <any>{
    let params = new HttpParams();
    params = params.append("email", email);
    return this.http.get( endPoint + '/checkemail', { params: params } );
  }  

  getUsersByRole(roleId: any): Observable<any> {
    let params = new HttpParams();
    params = params.append("roleId", roleId);

    return this.http.get<any>( endPoint + '/byrole', {params: params} );
  }  

}
