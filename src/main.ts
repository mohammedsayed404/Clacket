import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideAnimations(),
    provideToastr({
  positionClass: 'toast-top-left',
  toastClass: 'ngx-toastr custom-toast',
  timeOut: 2000,
  progressBar: true,
  closeButton: true,
}),
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ]
}).catch(err => console.error(err));
