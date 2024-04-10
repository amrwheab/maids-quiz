import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loading: LoadingBarService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loading.start();
    return next.handle(request).pipe(
      finalize(() => {
        this.loading.stop();
      })
    );
  }
}
