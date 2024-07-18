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
