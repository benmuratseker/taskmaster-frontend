import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from './Services/storage.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  const token = storageService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  return next(req).pipe(
    catchError((err) => {
      //token could be expired
      if (err.status === 403) {
        storageService.clearToken();
        router.navigate(['/login']);
        
      }

      return throwError(() => err);
    })
  );
  //dont forget to add this tokenInterceptor as provideHttpClient(withInterceptors([tokenInterceptor]) in app.config
};
