import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { StorageService } from '../../../../core/services/storage.service';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-log-in-page',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule    
  ],
  providers:[
    DatePipe
  ],
  templateUrl: './log-in-page.component.html',
  styleUrl: './log-in-page.component.scss'
})
export class LogInPageComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  storageService = inject(StorageService);
  router = inject( Router );
  snackBar = inject(MatSnackBar);
  datePipe = inject(DatePipe);
  
  isOnline: boolean = false;
  isLoggedIn: boolean = this.storageService.isLoggedIn();

  logInForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  version = environment.version;


  onSubmit() {
    if (this.logInForm.valid) {
      this.authService.signIn(this.logInForm.getRawValue())
        .subscribe({
          next: response => {
            this.createSession(response);
          },
          error: err => {
            console.log(err);
            this.snackBar.open((err.error.message ? err.error.message : err.message), 'Aceptar', {
              duration: 2000,
              verticalPosition: 'top',
            });
          }
        });
    } else {
      this.snackBar.open('No ha llenado toda la información, los campos requeridos se encuentran marcados por un asterisco(*).', 'Aceptar', { duration: 5000 });
    }
  }

  createSession(response: any) {
    this.storageService.saveUser(response.user);
    localStorage.setItem('token', response.user.accessToken);
    this.authService.currentUserSignal.set(response.user);
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
