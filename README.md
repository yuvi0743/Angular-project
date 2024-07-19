![image](https://github.com/user-attachments/assets/57cb60a0-5432-428f-b436-3c2c5ae4408c)![image](https://github.com/user-attachments/assets/8101416b-7a7e-472f-a669-5787ad58cee0)# Health-Challenge-Tracker
Link to the hosted web-app :
https://yuvi0743.github.io/Angular-project/
Charts are implemented using NgxCharts
Pagination was achieved using ngx-Pagination
For hosting github-pages was used.
As demanded, here is the test coverage file for the service file

All files / app workout.service.ts
100% Statements 23/23 100% Branches 11/11 100% Functions 8/8 100% Lines 22/22

import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
 
@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  
  workoutsKey = 'workouts';
  highestIdKey = 'highestId';
 
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeLocalStorage();
  }
 
  isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage;
  }
  getHighestId(): number {
    return parseInt(localStorage.getItem(this.highestIdKey) || '0', 10);
  }
 
  setHighestId(id: number): void {
    localStorage.setItem(this.highestIdKey, id.toString());
  }
  initializeLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      // Initialize with default data if not present
      if (!localStorage.getItem(this.workoutsKey)) {
        localStorage.setItem(this.workoutsKey, JSON.stringify([
          { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 4 }] },
          { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] },
          { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }] }
        ]));
        this.setHighestId(3);
      }
    } else {
      console.error('localStorage is not available or accessible.');
      // Handle this situation, e.g., show an error message to the user
    }
  }
 
  getWorkouts(): any[] {
    return JSON.parse(localStorage.getItem(this.workoutsKey) || '[]');
  }
 
  addWorkout(workout: any): void {
    const workouts = this.getWorkouts();
    const existingUser = workouts.find(user => user.name === workout.name);
 
    if (existingUser) {
      // Update existing user's workouts
      existingUser.workouts.push(...workout.workouts);
    } else {
      const newId = this.getHighestId() + 1;
      workouts.push({
        id: newId, 
        name: workout.name,
        workouts: workout.workouts
      });
      this.setHighestId(newId);
    }
    
    localStorage.setItem(this.workoutsKey, JSON.stringify(workouts));
  }
}

And here is the code coverage file for a component workout-list.component
All files / app/workout-list workout-list.component.ts
100% Statements 42/42 100% Branches 4/4 100% Functions 18/18 100% Lines 38/38
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WorkoutService } from '../workout.service';
import { CommonModule, NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  standalone:true,
  imports:[ReactiveFormsModule,NgFor,CommonModule,NgxPaginationModule,RouterOutlet],
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
![image](https://github.com/user-attachments/assets/07367108-1485-45e4-b855-06df3d6551a1)
![image](https://github.com/user-attachments/assets/aaafca0e-91ec-4e55-b6cb-afca818cb02b)
![image](https://github.com/user-attachments/assets/3acb1f69-3883-4d77-be21-6f9e66cd5288)
These are some screenshots of the UI.
