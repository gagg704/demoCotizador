import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';


export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/auth/auth.routes').then(mod => mod.AUTH_ROUTES),
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(mod => mod.AUTH_ROUTES),
    },
    {
        path: 'user',
        loadChildren: () => import('./features/user/user.routes').then(mod => mod.USER_ROUTES),
        canActivate: [authGuard]
    },  
        {
        path: 'cotizador',
        loadChildren: () => import('./features/cotizador/cotizador.routes').then(mod => mod.COTIZADOR_ROUTES),
    },  
    { path: '**', component: PageNotFoundComponent }
];

