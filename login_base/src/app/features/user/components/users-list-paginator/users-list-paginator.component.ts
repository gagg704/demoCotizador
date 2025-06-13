import { Component, output } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users-list-paginator',
  imports: [
    MatPaginator
  ],
  templateUrl: './users-list-paginator.component.html',
  styleUrl: './users-list-paginator.component.scss'
})
export class UsersListPaginatorComponent {

  paginationChange = output<any>();

  length = 0;
  pageIndex: number = 0;
  pageSize: number = 10;

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.paginationChange.emit({
      length: this.length,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    });
  }
}
