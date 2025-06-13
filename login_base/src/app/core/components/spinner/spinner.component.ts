import { Component, TemplateRef, input, contentChild, ContentChild } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-spinner',
    standalone: true,
    imports: [
        CommonModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

  loader$: Observable<boolean>;

  readonly detectRouteTransitions = input(false);

  @ContentChild("loader")
  customloaderIndicator: TemplateRef<any> | null = null;

  constructor(
  private loaderService: LoaderService, 
  private router: Router) {
    this.loader$ = this.loaderService.loader$;
  }

  ngOnInit() {
    if (this.detectRouteTransitions()) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.loaderService.loaderOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loaderService.loaderOff();
            }
          })
        )
        .subscribe();
    }
  }
}
