import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { InMemoryDataService } from './service/memory.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    provideToastr(),provideAnimations(),
    importProvidersFrom([
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
    ]),
  ]
};
