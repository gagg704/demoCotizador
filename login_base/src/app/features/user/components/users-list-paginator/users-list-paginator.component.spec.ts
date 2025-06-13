import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListPaginatorComponent } from './users-list-paginator.component';

describe('UsersListPaginatorComponent', () => {
  let component: UsersListPaginatorComponent;
  let fixture: ComponentFixture<UsersListPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListPaginatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
