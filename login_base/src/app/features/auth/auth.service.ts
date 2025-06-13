import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInterface, signInFormInterface } from '../user/shared/user.interface';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../core/services/storage.service';

const endpoint = environment.apiUrl + '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private storageService = inject(StorageService);

  currentUserSignal = signal<UserInterface | null | undefined>(undefined);

  signIn(user: signInFormInterface) {
    return this.http.post<{user: UserInterface}>( endpoint + 'signin' , {username: user.username, password: user.password}, httpOptions);
  }

  logOut() {
    this.storageService.clean();
    localStorage.removeItem('token');
    this.currentUserSignal.set(null);
    this.router.navigateByUrl('/').finally(()=>{
      this.reloadPage();
    });
  }

  reloadPage(): void {
    window.location.reload();
  }  

}
