import { Route } from '@angular/router';

import { UsersListComponent } from './pages/users-list/users-list.component';
import { authGuard } from '../../core/guards/auth.guard';
import { PageNotFoundComponent } from '../../core/pages/page-not-found/page-not-found.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';

export const USER_ROUTES: Route[] = [
  {
    path: 'list',
    component: UsersListComponent,
    canActivate: [authGuard]  
  },
  {
    path: 'create',
    component: CreateUserComponent,
    canActivate: [authGuard], 
    }, 
    {
    path: ':id/create',
    component: CreateUserComponent,
    canActivate: [authGuard],
    },    
  {path: '**', component: PageNotFoundComponent}
];