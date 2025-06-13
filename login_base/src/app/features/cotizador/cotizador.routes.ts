import { Route } from '@angular/router';
import { PageNotFoundComponent } from '../../core/pages/page-not-found/page-not-found.component';
import { authGuard } from '../../core/guards/auth.guard';
import { CotizadorComponent } from './components/cotizador/cotizador.component';
import { CotizadorListComponent } from './pages/cotizador-list/cotizador-list.component';


export const COTIZADOR_ROUTES: Route[] = [ 
    {
      path: 'formulario',
      component: CotizadorComponent, 
    },
    {
      path: 'lista',
      component: CotizadorListComponent, 
    },
  {path: '**', component: PageNotFoundComponent}
];