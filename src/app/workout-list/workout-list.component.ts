import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WorkoutService } from '../workout.service';
import { CommonModule, NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module
@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  standalone:true,
  imports:[ReactiveFormsModule,NgFor,CommonModule,NgxPaginationModule],
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {

  workouts: any[] = []; // Update the type as per your actual data structure
  filteredWorkouts: any[] = [];
  workoutForm: FormGroup;
  workoutTypes: string[] = ['All', 'Running', 'Cycling', 'Swimming', 'Yoga'];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private workoutService: WorkoutService, private fb: FormBuilder) {
    this.workoutForm = this.fb.group({
      searchName: [''],
      selectedWorkoutType: ['All'],
      itemsPerPage: [this.itemsPerPage]
    });
  }

  ngOnInit(): void {
    this.loadWorkouts();
    this.filterWorkouts();

    this.workoutForm.valueChanges.subscribe(() => {
      this.currentPage = 1; // Reset to first page when filters change
      this.filterWorkouts();
    });
  }

  loadWorkouts(): void {
    // Replace with your actual service call to fetch workouts
    this.workouts = this.workoutService.getWorkouts(); 
    this.filterWorkouts();
  }

  filterWorkouts(): void {
    let workouts = this.workouts.slice(); // Ensure we operate on a copy

    const searchName = this.workoutForm.get('searchName')?.value?.toLowerCase();
    const selectedWorkoutType = this.workoutForm.get('selectedWorkoutType')?.value;

    if (searchName) {
      workouts = workouts.filter(workout =>
        workout.name.toLowerCase().includes(searchName)
      );
    }

    if (selectedWorkoutType && selectedWorkoutType !== 'All') {
      workouts = workouts.filter(workout =>
        workout.workouts.some((w: any) => w.type === selectedWorkoutType)
      );
    }

    this.filteredWorkouts = workouts;
    this.currentPage = 1; // Reset to first page after filtering
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onItemsPerPageChange(event: any): void {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1; // Reset to first page when items per page changes
    this.filterWorkouts();
  }

  get pagedWorkouts(): any[] { // Update the type as per your actual data structure
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredWorkouts.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredWorkouts.length / this.itemsPerPage);
  }

  get isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  get isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  getWorkoutTypes(user: any): string {
    // Replace with your logic to get workout types from user data
    return user.workouts.map((w: any) => w.type).join(', ');
  }

  getTotalWorkoutMinutes(user: any): number {
    // Replace with your logic to calculate total workout minutes from user data
    return user.workouts.reduce((total: number, workout: any) => total + workout.minutes, 0);
  }
}