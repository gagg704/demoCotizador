import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../../../core/services/storage.service';

@Component({
  selector: 'app-cotizador',
  providers: [
    provideNativeDateAdapter(), {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-MX'
    },
    DatePipe
  ],
  imports: [
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
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatNativeDateModule,
    CommonModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    CommonModule,
    MatSort, 
    MatSortModule,
    MatLabel,
    MatSelectModule,
    MatPaginatorModule,

  ],
  templateUrl: './cotizador.component.html',
  styleUrl: './cotizador.component.scss'
})
export class CotizadorComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator | any = {};
  @ViewChild(MatSort) sort = new MatSort();

  fb = inject( FormBuilder );
  snackBar = inject(MatSnackBar);
  storageService = inject( StorageService );

  dataSource: any;
  cotizacionId: any = null;
  clave: any = [];
  displayedColumns = ['clave', 'cocup', 'descripcion','unidad','cantidad','preciounitario','total'];

  cotizacionForm: FormGroup = this.fb.group({
    /* Entidad */
    cotizacionId: [null],
    namecliente: ['', [Validators.required]],
    foliocotizacion: ['', [Validators.required]],
    datecotizacion: [new Date(), [Validators.required]],
    namepaciente:['', [Validators.required]],
    activo:['', [Validators.required]],
    derechohabiente:['', [Validators.required]],
    gn:['', [Validators.required]],
    ghgn:['', [Validators.required]],
    foliosubrogado:['', [Validators.required]],
    datecirugia: [new Date(), [Validators.required]],
    tipoatencion: [null],
    medico:['', [Validators.required]],
    hospital:['', [Validators.required]],
    cucopId: [null],
    descripcion:[''],
    unidad:[''],
    cantidad:[null],
    precio: [null],
  });

   ngOnInit() {
    this.getCocup();
    this.cotizacionForm.controls['descripcion'].disable()
    this.cotizacionForm.controls['unidad'].disable()
   }


  applyFilter() {
    // this.permissionService.getPermissionsEmployeee({searchString: this.searchString, status: this.status}).subscribe({
    //     next: response => {
    //       if ( response.data ) {
            this.dataSource = new MatTableDataSource();
      //       this.seleccionarPersona(response.data);
      //       this.rh = response.rh;
      //       this.dataSource.sort = this.sort;
      //       this.dataSource.paginator = this.paginator;
      //     }else{
      //       this.snackBar.open("No existen registros que mostrar o que cumplan con el criterio de busqueda", 'Aceptar', {duration:2000});
      //       this.dataSource = null;
      //     }
      //   },
      //   error: err => {
      //     this.snackBar.open("No existen registros que mostrar o que cumplan con el criterio de busqueda", 'Aceptar', {duration:2000} );
      //     this.dataSource = null;
      //   }
      // });
  }

  insert(){
    if (this.cotizacionForm.valid) {
      const formValue = this.cotizacionForm.getRawValue();
      // this.employeeService.saveEmployee(formValue).subscribe({
      //   next: response => {
      //     if (!response.data) {
      //       this.cleanForm();
      //     }
      //     if(response.data){
      //       if(response.data.id){
      //         this.cotizacionId = response.data.id;
      //         this.snackBar.open("Cotización registrada con éxito!", "Aceptar", { duration: 5000 });
      //       }
      //     }
      //   },
      //   error: err => {
      //     this.snackBar.open(err.message, "Aceptar", { duration: 5000 });
      //   },
      // });
    } else {
      this.snackBar.open("Falta información en el formulario, todos los campos marcados con (*), son obligatorios!", "Aceptar", { duration: 5000 });
    }
  }

  getCocup() {
    // this.employeeService.getFirmante()
    // .subscribe({
    //   next: response => {
    //     this.clave = response.data;
    //  this.storageService.saveCatalog( response.data, 'clave' );
    //   },
    //   error: err => {
    //     this.snackBar.open(err.message, "Aceptar", { duration: 5000 });
    //   }
    // });
  }

}
