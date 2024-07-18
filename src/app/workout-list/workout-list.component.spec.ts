// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../workout.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
@Injectable()
class MockWorkoutService {}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('WorkoutListComponent', () => {
  let fixture;
  let component;
  let mockWorkoutService: any;


  beforeEach(() => {
    mockWorkoutService = {
      getWorkouts: jasmine.createSpy('getWorkouts').and.returnValue([
        { name: 'Running', workouts: [{ type: 'Running' }] },
        { name: 'Cycling', workouts: [{ type: 'Cycling' }] },
        { name: 'Swimming', workouts: [{ type: 'Swimming' }] },
        { name: 'Yoga', workouts: [{ type: 'Yoga' }] }
      ])
    };
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,WorkoutListComponent ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: WorkoutService, useClass: MockWorkoutService },
        FormBuilder
      ]
    }).overrideComponent(WorkoutListComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });
  it('should filter workouts by searchName', () => {
    component.workouts = mockWorkoutService.getWorkouts();
    component.workoutForm.get('searchName')?.setValue('Run');
  
    component.filterWorkouts();
  
    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].name).toBe('Running');
  });
  it('should filter workouts by searchName with no matches', () => {
    component.workouts = mockWorkoutService.getWorkouts();
    component.workoutForm.get('searchName')?.setValue('NonExistent');
  
    component.filterWorkouts();
  
    expect(component.filteredWorkouts.length).toBe(0);
  });
  it('should filter workouts with no searchName', () => {
    component.workouts = mockWorkoutService.getWorkouts();
    component.workoutForm.get('searchName')?.setValue('');
  
    component.filterWorkouts();
  
    expect(component.filteredWorkouts.length).toBe(4);
  });
      
  it('should filter workouts with selectedWorkoutType as All', () => {
    component.workouts = mockWorkoutService.getWorkouts();
    component.workoutForm.get('selectedWorkoutType')?.setValue('All');
  
    component.filterWorkouts();
  
    expect(component.filteredWorkouts.length).toBe(4);
  });
  it('should filter workouts by selectedWorkoutType', () => {
    component.workouts = mockWorkoutService.getWorkouts();
    component.workoutForm.get('selectedWorkoutType')?.setValue('Cycling');
  
    component.filterWorkouts();
  
    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].name).toBe('Cycling');
  });
    
  it('should run GetterDeclaration #pagedWorkouts', async () => {
    component.filteredWorkouts = component.filteredWorkouts || {};
    component.filteredWorkouts = ['filteredWorkouts'];
    const pagedWorkouts = component.pagedWorkouts;

  });

  it('should run GetterDeclaration #totalPages', async () => {
    component.filteredWorkouts = component.filteredWorkouts || {};
    const totalPages = component.totalPages;

  });

  it('should run GetterDeclaration #isFirstPage', async () => {

    const isFirstPage = component.isFirstPage;

  });

  it('should run GetterDeclaration #isLastPage', async () => {

    const isLastPage = component.isLastPage;

  });

  it('should run #ngOnInit()', () => {
    // Mock loadWorkouts and filterWorkouts methods
    spyOn(component, 'loadWorkouts');
    spyOn(component, 'filterWorkouts');

    // Mock workoutForm and its valueChanges
    component.workoutForm = {
        valueChanges: of({})
    } as any;

    // Call ngOnInit
    component.ngOnInit();

    // Expect loadWorkouts and filterWorkouts to have been called
    expect(component.loadWorkouts).toHaveBeenCalled();
    expect(component.filterWorkouts).toHaveBeenCalled();
});

it('should run #loadWorkouts()', () => {
  // Mock workoutService and its getWorkouts method
  const mockWorkouts = []; // Mock data
  const mockWorkoutService = jasmine.createSpyObj('WorkoutService', ['getWorkouts']);
  mockWorkoutService.getWorkouts.and.returnValue(of(mockWorkouts));
  component.workoutService = mockWorkoutService;

  // Spy on filterWorkouts method
  spyOn(component, 'filterWorkouts');

  // Call loadWorkouts
  component.loadWorkouts();
  // Expect getWorkouts and filterWorkouts to have been called
  expect(component.workoutService.getWorkouts).toHaveBeenCalled();
  expect(component.filterWorkouts).toHaveBeenCalled();
});
it('should calculate totalPages correctly', () => {
  // Mock data
  component.filteredWorkouts = [1, 2, 3, 4, 5, 6]; // Mocking filtered workouts
  component.itemsPerPage = 2;
  
  // Call totalPages property
  const totalPages = component.totalPages;

  // Expect totalPages to be calculated correctly
  expect(totalPages).toEqual(3); // 6 items / 2 itemsPerPage = 3 pages
});

it('should handle edge case when filteredWorkouts is empty', () => {
  // Mock data
  component.filteredWorkouts = []; // No workouts
  component.itemsPerPage = 10;

  // Call totalPages property
  const totalPages = component.totalPages;

  // Expect totalPages to be 0 when there are no workouts
  expect(totalPages).toEqual(0);
});

  

  it('should run #onPageChange()', async () => {

    component.onPageChange({});

  });

  it('should run #onItemsPerPageChange()', () => {
    // Spy on filterWorkouts method
    spyOn(component, 'filterWorkouts');

    // Simulate event with mock target value
    const mockEvent = {
        target: {
            value: {}
        }
    };

    // Call onItemsPerPageChange with mock event
    component.onItemsPerPageChange(mockEvent);

    // Expect filterWorkouts to have been called
    expect(component.filterWorkouts).toHaveBeenCalled();
});

  it('should run #getWorkoutTypes()', async () => {

    component.getWorkoutTypes({
      workouts: [{
        0: {
          type: {}
        },
        join: function() {}
      }]
    });

  });

  it('should run #getTotalWorkoutMinutes()', async () => {

    component.getTotalWorkoutMinutes({
      workouts: [{}, {
        minutes: {}
      }]
    });

  });

});