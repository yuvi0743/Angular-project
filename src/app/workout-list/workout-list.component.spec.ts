import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../workout.service';
import { of, toArray } from 'rxjs'; // Import both of and toArray
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let mockWorkoutService: WorkoutService;

  beforeEach(async () => {
    mockWorkoutService = jasmine.createSpyObj('WorkoutService', ['getWorkouts']);
    await TestBed.configureTestingModule({
      declarations: [ ],
      imports:[FormsModule, ReactiveFormsModule,WorkoutListComponent ],
      providers: [ { provide: WorkoutService, useValue: mockWorkoutService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should filter workouts by search name (ignoring case)', () => {
    const mockWorkouts = [
      { name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { name: 'Jane Doe', workouts: [{ type: 'Yoga', minutes: 45 }] },
    ];
    component.workouts = mockWorkouts;
    component.workoutForm?.get('searchName')?.setValue('doe');
    component.filterWorkouts();
    expect(component.filteredWorkouts).toEqual(mockWorkouts); // All workouts should match (case-insensitive)
  });
  

  it('should filter workouts by workout type', () => {
    const mockWorkouts = [
      { name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { name: 'Jane Doe', workouts: [{ type: 'Yoga', minutes: 45 }] },
    ];
    component.workouts = mockWorkouts;
    component.workoutForm?.get('selectedWorkoutType')?.setValue('Running');
    component.filterWorkouts();
    expect(component.filteredWorkouts).toEqual([mockWorkouts[0]]);
  });
  

  it('should reset to first page when filtering', () => {
    component.currentPage = 2;
    component.filterWorkouts();
    expect(component.currentPage).toEqual(1);
  });

  it('should calculate paged workouts', () => {
    const mockWorkouts = [1, 2, 3, 4, 5, 6];
    component.filteredWorkouts = mockWorkouts;
    component.itemsPerPage = 3;
    expect(component.pagedWorkouts).toEqual([1, 2, 3]);
  });

  it('should calculate total pages', () => {
    const mockWorkouts = [1, 2, 3, 4, 5];
    component.filteredWorkouts = mockWorkouts;
    component.itemsPerPage = 2;
    expect(component.totalPages).toEqual(3);
  });

  it('should indicate first page', () => {
    component.currentPage = 1;
    expect(component.isFirstPage).toEqual(true);
  });

  it('should calculate total pages', () => {
    const mockWorkouts = [1, 2, 3, 4, 5];
    component.filteredWorkouts = mockWorkouts;
    component.itemsPerPage = 2;
    expect(component.totalPages).toEqual(3); // Assert the property value
  });
  

  it('should get workout types from user', () => {
    const mockUser = { workouts: [{ type: 'Running' }, { type: 'Yoga' }] };
    expect(component.getWorkoutTypes(mockUser)).toEqual('Running, Yoga');
  });

  it('should calculate total workout minutes from user', () => {
    const mockUser = { workouts: [{ minutes: 30 }, { minutes: 45 }] };
    expect(component.getTotalWorkoutMinutes(mockUser)).toEqual(75);
  });

  it('should update items per page and reset to first page', () => {
    component.currentPage = 2;
    component.itemsPerPage = 4;
    component.onItemsPerPageChange({ target: { value: 4 } });
    expect(component.currentPage).toEqual(1);
    expect(component.itemsPerPage).toEqual(4);
  });

  it('should update page number on click', () => {
    component.currentPage = 1;
    component.onPageChange(2);
    expect(component.currentPage).toEqual(2);
  });
});
