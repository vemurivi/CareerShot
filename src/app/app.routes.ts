import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './account/register.component';
import { ExperienceComponent } from './experience/experience.component';
import { ResumeComponent } from './resume/resume.component';
import { userGuard } from './services/routeguard';

export const APP_ROUTES: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'experience/:name', component: ExperienceComponent, canActivate: [userGuard] },
    { path: 'resume/:name', component: ResumeComponent, canActivate: [userGuard] },
    { path: '', redirectTo: '/register', pathMatch: 'full' },
    { path: ':name', component: HomeComponent, canActivate: [userGuard] }
];
