import { CommonModule, NgSwitchCase } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { SpinnerComponent } from './core/components/spinner/spinner.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AuthService } from './features/auth/auth.service';
import { StorageService } from './core/services/storage.service';
import { UserService } from './features/user/shared/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone:true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    SpinnerComponent,
    FlexLayoutModule,

  ],
  providers: [
    {
        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: { appearance: 'outline' },
    },
],  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sedarpa';

  isLoggedIn: boolean = false;
  isOnline: boolean = true;

  auth = inject(AuthService);
  userService = inject( UserService );
  storageService = inject(StorageService);
  snackBar = inject( MatSnackBar );

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if( this.isLoggedIn ){
      this.getRoles();
    }
  }

  getRoles() {
    this.userService.getAllRoles()
      .subscribe({
        next: response => {
          this.storageService.saveCatalog( response.data, 'roles' );
        },
        error: err => {
          this.snackBar.open(err.message, "Aceptar", { duration: 5000 });
        }
      });
  }

  logOut() {
    this.auth.logOut();
  }
    
}
