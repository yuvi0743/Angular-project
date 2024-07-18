// @ts-nocheck

import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { PLATFORM_ID } from '@angular/core';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutService]
    });
    service = TestBed.inject(WorkoutService);
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      switch (key) {
        case service.workoutsKey:
          return JSON.stringify([
            { id: 1, name: 'John', workouts: [{ type: 'Running' }] },
            { id: 2, name: 'Doe', workouts: [{ type: 'Cycling' }] }
          ]);
        case 'highestId':
          return '2';
        default:
          return null;
      }
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      // You can handle setItem mock logic here if needed
    });

    spyOn(service, 'getWorkouts').and.callThrough();
    spyOn(service, 'getHighestId').and.callThrough();
    spyOn(service, 'setHighestId').and.callThrough();
  });

  it('should run #isLocalStorageAvailable()', async () => {

    service.isLocalStorageAvailable();

  });

  it('should run #getHighestId()', async () => {
    
    service.getHighestId();

  });

  it('should run #setHighestId()', () => {
    // Spy on setHighestId method
    service.setHighestId({
        toString: function() {}
    });

});
it('should add a new workout', () => {
  const newWorkout = { name: 'Alice', workouts: [{ type: 'Yoga' }] };

  service.addWorkout(newWorkout);

  expect(service.getWorkouts).toHaveBeenCalled();
  expect(service.getHighestId).toHaveBeenCalled();
  expect(service.setHighestId).toHaveBeenCalledWith(3); // Ensure setHighestId is called with the correct new ID
  expect(localStorage.setItem).toHaveBeenCalledWith(service.workoutsKey, JSON.stringify([
    { id: 1, name: 'John', workouts: [{ type: 'Running' }] },
    { id: 2, name: 'Doe', workouts: [{ type: 'Cycling' }] },
    { id: 3, name: 'Alice', workouts: [{ type: 'Yoga' }] }
  ]));
});


it('should update existing user workouts', () => {
  const existingWorkout = { name: 'John', workouts: [{ type: 'Swimming' }] };

  service.addWorkout(existingWorkout);

  expect(service.getWorkouts).toHaveBeenCalled();
  expect(service.setHighestId).not.toHaveBeenCalled(); // Ensure setHighestId is not called for existing user
  expect(localStorage.setItem).toHaveBeenCalledWith(service.workoutsKey, JSON.stringify([
    { id: 1, name: 'John', workouts: [{ type: 'Running' }, { type: 'Swimming' }] },
    { id: 2, name: 'Doe', workouts: [{ type: 'Cycling' }] }
  ]));
});



  it('should run #initializeLocalStorage()', () => {
    // Spy on isLocalStorageAvailable and setHighestId methods
    spyOn(service, 'isLocalStorageAvailable');

    // Call initializeLocalStorage
    service.initializeLocalStorage();
    // Expect isLocalStorageAvailable and setHighestId to have been called
    expect(service.isLocalStorageAvailable).toHaveBeenCalled();
});


  it('should run #getWorkouts()', async () => {

    service.getWorkouts();

  });
        it('should run #undefined()', async () => {
    // Error: ERROR Util.getNode JS code is invalid, "(...undefined)"
    //     at Util.getNode (/var/task/lib/util.js:181:13)
    //     at Util.getObjectFromExpression (/var/task/lib/util.js:290:25)
    //     at FuncTestGen.setPropsOrParams (/var/task/lib/func-test-gen.js:243:18)
    //     at FuncTestGen.setMockData (/var/task/lib/func-test-gen.js:161:12)
    //     at FuncTestGen.setMockData (/var/task/lib/func-test-gen.js:90:12)
    //     at /var/task/lib/func-test-gen.js:80:14
    //     at Array.forEach (<anonymous>)
    //     at FuncTestGen.setMockData (/var/task/lib/func-test-gen.js:79:17)
    //     at FuncTestGen.setMockData (/var/task/lib/func-test-gen.js:104:12)
    //     at /var/task/lib/index.js:188:17
  });

});