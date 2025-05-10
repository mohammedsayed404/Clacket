import { HttpInterceptorFn } from '@angular/common/http';
import { BusyService } from '../Services/busy.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const _busyService = inject(BusyService);
  _busyService.busy();


    return next(req).pipe(
      finalize( () =>{
      _busyService.idle();
    }));
};
