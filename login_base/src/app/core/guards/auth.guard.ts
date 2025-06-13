import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  const storageService = inject(StorageService);

  if (storageService.isLoggedIn()) {
    return true;
  } else {
    const router: Router = inject(Router);
    router.navigate(['/']);
    return false;
  }  
   ;

};
