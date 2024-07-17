import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WorkoutService } from '../workout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {

  workouts: any[] = [];
  filteredWorkouts: any[] = [];
  workoutForm: FormGroup;
  workoutTypes: string[] = ['All', 'Running', 'Cycling', 'Swimming', 'Yoga'];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private workoutService: WorkoutService, private fb: FormBuilder) {
    this.workoutForm = this.fb.group({
      searchName: [''],
      selectedWorkoutType: ['All'],
      itemsPerPage: [5]
    });
  }

  ngOnInit(): void {
    this.loadWorkouts();
    this.filterWorkouts();

    this.workoutForm.valueChanges.subscribe(() => {
      this.currentPage = 1;
      this.filterWorkouts();
    });
  }

  loadWorkouts(): void {
    this.workouts = this.workoutService.getWorkouts();
    this.filterWorkouts();
  }

  filterWorkouts(): void {
    let workouts = this.workouts;
    const searchName = this.workoutForm.get('searchName')?.value.toLowerCase();
    const selectedWorkoutType = this.workoutForm.get('selectedWorkoutType')?.value;

    if (searchName) {
      workouts = workouts.filter(workout =>
        workout.name.toLowerCase().includes(searchName)
      );
    }

    if (selectedWorkoutType !== 'All') {
      workouts = workouts.filter(workout =>
        workout.workouts.some((w: { type: any; }) => w.type === selectedWorkoutType)
      );
    }

    this.filteredWorkouts = workouts.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.filterWorkouts();
  }

  getWorkoutTypes(user: any): string {
    return user.workouts.map((w: any) => w.type).join(', ');
  }

  getTotalWorkoutMinutes(user: any): number {
    return user.workouts.reduce((total: number, workout: any) => total + workout.minutes, 0);
  }
}
