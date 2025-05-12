import { errorInterceptor } from './Core/interceptors/error.interceptor';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { jwtInterceptor } from './Core/interceptors/jwt.interceptor';
import { loadingInterceptor } from './Core/interceptors/loading.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([errorInterceptor,jwtInterceptor,loadingInterceptor]),),
      provideAnimationsAsync(),
      importProvidersFrom(BrowserAnimationsModule),

  ]
};
