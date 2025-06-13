import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export const SkipLoading = new HttpContextToken<boolean>(() => false);

export const fnLoaderInterceptor: HttpInterceptorFn = (req, next) => {
    let loaderService = inject(LoaderService);

    // Check for a custom attribute 
    // to avoid showing loading spinner
    if (req.context.get(SkipLoading)) {
        // Pass the request directly to the next handler
        return next(req);
      }
  
      // Turn on the loading spinner
      loaderService.loaderOn();
  
      return next(req).pipe(
        finalize(() => {
          // Turn off the loading spinner
          loaderService.loaderOff();
        })
      );

};