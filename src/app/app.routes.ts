import { Route, Routes } from '@angular/router';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { ChartComponent } from './chart/chart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/add-workout', pathMatch: 'full' }, // Redirect to add-workout by default
  { path: 'add-workout', component: AddWorkoutComponent },
  { path: 'workout-list', component: WorkoutListComponent },
  { path:'charts' , component : ChartComponent}
  // Other routes can be added here
];