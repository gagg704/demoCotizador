import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { MatSelectModule } from '@angular/material/select';
import { CotizadorTableComponent } from "../../components/cotizador-table/cotizador-table/cotizador-table.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cotizador-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatIcon,
    MatButtonModule,
    MatDividerModule,
    SearchComponent,
    MatSelectModule,
    CotizadorTableComponent
],
  templateUrl: './cotizador-list.component.html',
  styleUrl: './cotizador-list.component.scss'
})
export class CotizadorListComponent {

  titleHeightVar: any = null;
  contentHeigth: any = null;
  search: string = '';
  paginationData: any = null;

  constructor(private router: Router,){}

  ngOnInit() {
    
  }

  insertCotizacion() {
    this.router.navigate(["cotizador/formulario"]);
    
  }

  searchChange( search: string ){
    this.search = search;
  }


  


}
