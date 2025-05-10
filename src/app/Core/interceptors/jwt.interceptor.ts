import { HttpInterceptorFn } from '@angular/common/http';
import { API } from '../../API/API';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.includes(API.TMDBUrl)) {
    req = req.clone({
      headers: API.TMDB_Header_Token
    });
  }

  else if (req.url.includes(API.AuthUrl)) {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwt}`)
      });
    }
  }

  return next(req);
};
