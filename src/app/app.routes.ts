import { Routes } from '@angular/router';
import { AuthGuard } from './features/auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'events',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/eventmanagement/eventmanagement.component').then(
            (m) => m.EventmanagementComponent
          ),
      },
      {
        path: 'add-events',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/addevents/addevents.component').then(
            (m) => m.AddeventsComponent
          ),
      },
      {
        path: 'ticket-booking',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/eventbooking/eventbooking.component').then(
            (m) => m.EventbookingComponent
          ),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
];
