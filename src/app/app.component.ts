import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AddWorkoutComponent } from "./add-workout/add-workout.component";
import { WorkoutListComponent } from './workout-list/workout-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddWorkoutComponent,WorkoutListComponent,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'health-challenge-tracker';
}
