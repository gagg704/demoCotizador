import { Component, output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  imports: [
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatIconModule,
    FlexLayoutModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  searchChange = output<string>();
  timer: any;

  search(event: any) {
  
    const filterValue = event ? (event.target as HTMLInputElement).value : '' ;
  
    if ( filterValue.length >= 3 || filterValue.length == 0) {
      clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.searchChange.emit( filterValue )
        }, 1100);
    }
  }  
}
