import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-cotizador-table',
  imports: [
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDivider,
    FlexLayoutModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './cotizador-table.component.html',
  styleUrl: './cotizador-table.component.scss'
})
export class CotizadorTableComponent {


  @Input('search') search!: any;
  @Output() saludar = new EventEmitter<void>();
  searchString: any = '';
  ngOnChanges(changes: SimpleChanges) {
    if (changes['search']) {
      if (changes['search'].currentValue || changes['search'].currentValue == '') {
        this.searchString = changes['search'].currentValue
        //this.applyFilter();
      }
    }
  }

  dataSource: any;
  displayedColumns: string[] = ['opciones','clave', 'cliente', 'fecha', 'total' ];

  ngOnInit() {}

}
