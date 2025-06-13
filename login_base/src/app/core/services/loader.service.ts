import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: "root",
  })
  export class LoaderService {

    private loaderSubject = 
      new BehaviorSubject<boolean>(false);

    loader$ = this.loaderSubject.asObservable();
  
    loaderOn() {
      this.loaderSubject.next(true);
    }
  
    loaderOff() {
      this.loaderSubject.next(false);
    }
  }
  