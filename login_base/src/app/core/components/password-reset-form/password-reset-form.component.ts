import { Component, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../features/user/shared/user.service';

@Component({
  selector: 'app-password-reset-form',
  imports: [
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatLabel
  ],
  providers:[
    provideNativeDateAdapter(), {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },    
  ],
  templateUrl: './password-reset-form.component.html',
  styleUrl: './password-reset-form.component.scss'
})
export class PasswordResetFormComponent {

  fb = inject(FormBuilder);
  snackBar = inject( MatSnackBar );
  userService = inject( UserService );

  resetForm = this.fb.group({
    lastPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    repeatNewPassword: ['', Validators.required],
  });

  save(){
    if( this.resetForm.controls["newPassword"].value == this.resetForm.controls["repeatNewPassword"].value ){
      this.userService.resetPassword( this.resetForm.getRawValue() ).subscribe({
        next: response =>{

        },
        error: err =>{

        }
      })

    }else{
      this.snackBar.open("La nueva contraseña no coincide, favor de verificarla!","Aceptar",{duration:2000});
    }
  }

}
