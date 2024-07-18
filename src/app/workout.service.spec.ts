// @ts-nocheck

import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { WorkoutService } from './workout.service';
import { PLATFORM_ID } from '@angular/core';

describe('WorkoutService', () => {
  let service;

  beforeEach(() => {
    service = new WorkoutService({});
  });

  it('should run #isLocalStorageAvailable()', async () => {

    service.isLocalStorageAvailable();

  });

  it('should run #getHighestId()', async () => {

    service.getHighestId();

  });

  it('should run #setHighestId()', async () => {

    service.setHighestId({
      toString: function() {}
    });

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