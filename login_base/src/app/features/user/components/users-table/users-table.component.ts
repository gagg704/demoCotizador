import { Component, ElementRef, inject, input, viewChild, effect, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { UserService } from '../../shared/user.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInterface } from '../../shared/user.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDivider } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-users-table',
  imports: [
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDivider,
    DatePipe,
    RouterLink,
    FlexLayoutModule
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  
  @Input('searchString') searchString: any = null;
  @Input('paginationData') paginationData: any = null;

  dataSource = null;
  
  title: string = "Usuarios";
  users: UserInterface[] = [];
  length = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedColumns: string[] = ['opciones', 'usuario', 'rol', 'nombre', 'apellidos', 'correo electronico', 'teléfono', 'celular', 'creado'];
  pageEvent: PageEvent = new PageEvent;
  search: string = '';

  userService = inject( UserService );
  _liveAnnouncer = inject( LiveAnnouncer );
  snackBar = inject( MatSnackBar );

  ngOnInit() {
    this.applyFilter();
  }

  ngOnChanges( changes: SimpleChanges ){

    if( changes['searchString'] ){
      if( changes['searchString'].currentValue ){        
        this.search = changes['searchString'].currentValue;
        this.applyFilter();
      }
    }

    if( changes['paginationData'] ){
      if( changes['paginationData'].currentValue ){        
        const paginationData = changes['paginationData'].currentValue;
        this.pageIndex = paginationData.pageIndex;
        this.pageSize = paginationData.pageSize;
        this.length = paginationData.length;
        this.applyFilter();
      }
    }

  }  

  deleteUser(userId: number) {
    this.userService.delete(userId)
    .subscribe({
      next: response => {        
        this.applyFilter();
        this.snackBar.open( response.message, "Aceptar", { duration: 5000 } );
      },
      error: err => {
        this.snackBar.open( err.message, "Aceptar", { duration: 5000 } );
      }
    });    
  }  

  private applyFilter() {

        this.userService.getAll(this.pageSize, this.pageIndex + 1, this.search )
          .subscribe({
            next: response => {
              if ( response.data ) {

                this.dataSource = response.data.data;
                this.length = response.data.total;
                //this.dataSource.sort = this.sort;
                //this.dataSource.paginator = this.paginator
              }else{
                this.snackBar.open("No existen registros que mostrar o que cumplan con el criterio de busqueda", 'Aceptar', {duration:2000});
                this.dataSource = null;
              }
            },
            error: err => {
              this.snackBar.open("No existen registros que mostrar o que cumplan con el criterio de busqueda", 'Aceptar', {duration:2000} );
              this.dataSource = null;
            }
          });

  }



  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
