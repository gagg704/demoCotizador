import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsersTableComponent } from '../../components/users-table/users-table.component';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { MatDividerModule } from '@angular/material/divider';
import { UsersListPaginatorComponent } from '../../components/users-list-paginator/users-list-paginator.component';


@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        FlexLayoutModule,
        MatIcon,
        MatButtonModule,
        MatDividerModule,
        UsersTableComponent,
        SearchComponent,
        UsersListPaginatorComponent
    ],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
    searchString: string = '';
    paginationData: any = null;

    searchChange( search: string ){
        console.log(search);
        this.searchString = search;
    }

    paginationChange( paginationData: any ){
        console.log(paginationData);
        this.paginationData = paginationData;
        //this.searchString = search;
    }    

}