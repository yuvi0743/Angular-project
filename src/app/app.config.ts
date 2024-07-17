import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';

const routes: Route[] = [
  { path: '', redirectTo: '/add-workout', pathMatch: 'full' }, // Redirect to add-workout by default
  { path: 'add-workout', component: AddWorkoutComponent },
  { path: 'workout-list', component: WorkoutListComponent }
  // Other routes can be added here
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),importProvidersFrom(FormsModule)]
};
