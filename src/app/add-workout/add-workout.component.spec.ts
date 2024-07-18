// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { AddWorkoutComponent } from './add-workout.component';
import { WorkoutService } from '../workout.service';
import { FormBuilder } from '@angular/forms';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

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

describe('AddWorkoutComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ,AddWorkoutComponent],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: WorkoutService, useClass: MockWorkoutService },
        FormBuilder
      ]
    }).overrideComponent(AddWorkoutComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #addWorkout()', async () => {
    // Mock workoutService
    const mockWorkoutService = {
        addWorkout: () => {}
    };
    // Assign mock service to component
    component.workoutService = mockWorkoutService as any;

    // Spy on addWorkout method
    const addWorkoutSpy = spyOn(component.workoutService, 'addWorkout').and.callThrough();

    // Call addWorkout method
    component.addWorkout();

    // Expect addWorkout method to have been called
    expect(addWorkoutSpy).toHaveBeenCalled();
});

});