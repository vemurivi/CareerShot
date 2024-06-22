import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { userReducer } from './app/store/user.reducer';
import { UserEffects } from './app/store/user.effects';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ user: userReducer }),
    provideEffects([UserEffects]),
    provideRouter(APP_ROUTES),
    provideHttpClient(), provideAnimationsAsync()
]
}).catch(err => console.error(err));