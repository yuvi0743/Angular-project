import { Component } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-workout',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number | null = null;

  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    if (this.userName && this.workoutType && this.workoutMinutes !== null) {
      const newWorkout = {
        id: Date.now(),  // Using timestamp as a unique ID for simplicity
        name: this.userName,
        workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }]
      };

      this.workoutService.addWorkout(newWorkout);

      // Reset form fields
      this.userName = '';
      this.workoutType = '';
      this.workoutMinutes = null;

      alert('Workout added successfully!');
    } else {
      alert('Please fill in all fields.');
    }
  }
}
