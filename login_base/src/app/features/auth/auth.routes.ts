import { Route } from '@angular/router';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';

export const AUTH_ROUTES: Route[] = [
    { 
        path: '', 
        component: LogInPageComponent, 
    },    
    // { path: '**', redirectTo: appPaths.error404 },
];