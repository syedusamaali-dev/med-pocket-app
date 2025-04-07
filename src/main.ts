import 'zone.js'; // <-- MUST BE AT THE TOP

import { bootstrapApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { App } from './app/app.component';

bootstrapApplication(App, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
}).catch((err) => console.error(err));