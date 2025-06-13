import { AfterViewInit, Component, ElementRef, OnInit, inject, viewChild } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostalCodeService } from '../../../../core/services/postalcode.services';
import { ActivatedRoute } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UppercaseDirective } from '../../../../core/directives/uppercase.directive';
import { StorageService } from '../../../../core/services/storage.service';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

@Component({
    selector: 'app-form-user',
     standalone: true, imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FlexLayoutModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatSlideToggleModule,
        UppercaseDirective,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardContent,
        MatCardFooter,
        MatDivider
    ],
    templateUrl: './form-user.component.html',
    styleUrl: './form-user.component.scss'
})
export class FormUserComponent implements OnInit {

  fb = inject( FormBuilder );

  roles: any = [];
  userId: any = null;
  postalCodes: any = [];
  timer: any;
  changePassword: boolean = false;

  userForm: FormGroup = this.fb.group({
    id: [{ value: null, disabled: true }],
    username: [null, [Validators.required, Validators.pattern(/^[A-Z0-9a-zÁáÉéÍíÓóÚúÜüÑñ]+$/), Validators.minLength(6)]],
    password: [null, [Validators.required]],
    name: [null, [Validators.required, Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ ]+$/)]],
    lastname: [null, [Validators.required, Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ ]+$/)]],
    email: [null, [Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
    phone_house: [null, [Validators.minLength(10), Validators.pattern(/^[1-9]\d{9}$/)]],
    phone_cel: [null, [Validators.required, Validators.minLength(10), Validators.pattern(/^[1-9]\d{9}$/)]],
    postalcodeId: [null, [Validators.required]],
    street: [null],
    external_number: [null],
    internal_number: [null],
    roleId: [null, [Validators.required]],
  });

  readonly state = viewChild.required<ElementRef>("state");
  readonly municipality = viewChild.required<ElementRef>("municipality");
  readonly city = viewChild.required<ElementRef>("city");
  readonly postalCodeFilter = viewChild.required<ElementRef>("postalCodeFilter");

  userService = inject ( UserService);
  postalCodeService = inject( PostalCodeService );
  storageService = inject( StorageService );
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getUser(params['id']);
      }
    });

    this.roles = this.storageService.getCatalog('roles');
    console.log( this.roles );
  }

  sendForm() {
    if (this.userForm.valid) {
      const formValue = this.userForm.getRawValue();
      this.userService.create(formValue)
        .subscribe({
          next: response => {
            if (!response.data[0]) {
              this.cleanForm();
            }
            this.snackBar.open("Se creo exitosamente el registro del nuevo usuario!", "Aceptar");
          },
          error: err => {
            this.snackBar.open(err.message, "Aceptar", { duration: 5000 });
          },
        });
    } else {
      this.snackBar.open("Falta información en el formulario, todos los campos marcados con (*), son obligatorios!", "Aceptar", { duration: 5000 });
    }
  }

  checkUsername() {
    if (this.userForm.controls['username'].valid) {
      const username = this.userForm.value.username;
      this.userService.checkUsername(username)
        .subscribe({
          next: response => {
            if (response.data) {
              this.userForm.controls['username'].setErrors({ 'incorrect': true });;
              this.snackBar.open(response.message, "Aceptar");
            }
          },
          error: err => {
            this.snackBar.open(err.message, "Aceptar", { duration: 5000 });
          }
        })
    }
  }

  checkEmail() {
    if (this.userForm.controls['email'].valid) {
      const email = this.userForm.value.email;
      this.userService.checkEmail(email)
        .subscribe({
          next: response => {
            if (response.data) {
              this.userForm.controls['email'].setErrors({ 'incorrect': true });;
              this.snackBar.open(response.message, "Aceptar");
            }
          },
          error: err => {
            this.snackBar.open(err.message, "Aceptar", { duration: 5000 });
          }
        })
    }
  }

  getPostalCodeByFilter(event: any) {
    //if( this.userForm.controls['postalCodeId'].valid ){
    const filterValue = event.target.value;
    if (filterValue.length >= 3) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.postalCodeService.getPostalCodeByFilter(filterValue)
          .subscribe({
            next: response => {
              if (!response.data) {
                this.userForm.controls['postalcodeId'].setErrors({ 'incorrect': true });;
                this.snackBar.open(response.message, "Aceptar");
              } else {
                this.postalCodes = response.data;
              }
            },
            error: err => {
              this.snackBar.open(err.message, "Aceptar", { duration: 5000 });
            }
          })
      }, 1100);
    }


    //}    
  }

  getPostalCodeById(id: any) {
    this.postalCodeService.getPostalCodeById(id)
      .subscribe({
        next: response => {
          if (!response.data) {
            this.userForm.controls['postalcodeId'].setErrors({ 'incorrect': true });;
            this.snackBar.open(response.message, "Aceptar");
          } else {
            this.onPostalCodeSelect(response.data.id, response.data.d_codigo, response.data.d_estado, response.data.D_mnpio, response.data.d_ciudad);
          }
        },
        error: err => {
          this.snackBar.open(err.message, "Aceptar", { duration: 5000 });
        }
      })
  }

  onPostalCodeSelect(id: any, d_codigo: any, d_estado: any, D_mnpio: any, d_ciudad: any) {
    this.state().nativeElement.value = d_estado;
    this.municipality().nativeElement.value = D_mnpio;
    this.city().nativeElement.value = d_ciudad;
    this.postalCodeFilter().nativeElement.value = d_codigo;
    this.userForm.controls['postalcodeId'].patchValue(id);

  }

  getUser(id: number) {
    this.userService.getUser(id)
      .subscribe({
        next: response => {
          this.userForm.patchValue({
            id: response.data.id,
            username: response.data.username,
            roleId: response.data.roleId,
            name: response.data.name,
            lastname: response.data.lastname,
            email: response.data.email,
            phone_house: response.data.phone_house,
            phone_cel: response.data.phone_cel,
            postalcodeId: response.data.postalcodeId,
            street: response.data.street,
            external_number: response.data.external_number,
            internal_number: response.data.internal_number,
          });
          this.userForm.controls['username'].disable();
          this.userForm.controls['roleId'].setValue(parseInt(response.data.roleId));
          this.userId = response.data.id;
          this.getPostalCodeById(response.data.postalcodeId);
          this.updateChangePassword();
        },
        error: err => {

        }
      });
  }

  updateChangePassword(){
    if( this.changePassword ){
      this.userForm.controls['password'].enable();
      this.userForm.controls['password'].setValidators([
        Validators.required
      ]);
    }else{
      this.userForm.controls['password'].disable();
      this.userForm.controls['password'].setValidators([]);
    }
    this.userForm.controls['password'].updateValueAndValidity();

  }

  cleanForm() {
    this.userForm.reset();
    this.userId = null;
    this.postalCodeFilter().nativeElement.value = null;
  }
}
