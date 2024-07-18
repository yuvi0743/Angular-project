import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddWorkoutComponent } from './add-workout.component';
import { WorkoutService } from '../workout.service'; // Assuming your service is here

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let workoutService: WorkoutService;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, AddWorkoutComponent],
      providers: [
        { provide: WorkoutService, useValue: jasmine.createSpyObj('WorkoutService', ['addWorkout']) },
        FormBuilder,
      ],
    }).compileComponents();

    workoutService = TestBed.inject(WorkoutService);
    fb = TestBed.inject(FormBuilder);
    component = new AddWorkoutComponent(workoutService, fb);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form group with required username and workout minutes', () => {
    expect(component.workoutForm instanceof FormGroup).toBeTruthy();
    const formControls = component.workoutForm.controls;
    expect(formControls['userName'].validator).toContain(Validators.required);
    expect(formControls['workoutMinutes'].validator).toContain(Validators.required);
  });

  it('should disable submit button when form is invalid', () => {
    const fixture = TestBed.createComponent(AddWorkoutComponent);
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable submit button when form is valid', () => {
    component.workoutForm.controls['userName'].setValue('John Doe');
    component.workoutForm.controls['workoutMinutes'].setValue(30);
    expect(component.workoutForm.valid).toBeTruthy();
    const fixture = TestBed.createComponent(AddWorkoutComponent);
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeFalse();
  });

  it('should call addWorkout service on form submit with valid data', () => {
    component.workoutForm.controls['userName'].setValue('John Doe');
    component.workoutForm.controls['workoutMinutes'].setValue(30);
    component.workoutForm.controls['workoutType'].setValue('Running'); // Optional field
    component.addWorkout();
    expect(workoutService.addWorkout).toHaveBeenCalledOnceWith({
      name: 'John Doe',
      workouts: [{ type: 'Running', minutes: 30 }],
    });
  });

  it('should reset form fields after successful submission', () => {
    component.workoutForm.controls['userName'].setValue('John Doe');
    component.workoutForm.controls['workoutMinutes'].setValue(30);
    component.addWorkout();
  
    // Access form values through the form group instance
    expect(component.workoutForm.get('userName').value).toEqual('');
    expect(component.workoutForm.get('workoutMinutes').value).toEqual(null);
    expect(component.workoutForm.get('workoutType').value).toEqual(''); // Optional field
  });
});

