import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { provideClientHydration } from '@angular/platform-browser';
import { TimelineComponent } from './timeline/timeline.component'; // Import komponentu

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    // Dodajemy TimelineComponent do deklaracji
    {
      provide: TimelineComponent,
      useClass: TimelineComponent
    }
  ],
};
