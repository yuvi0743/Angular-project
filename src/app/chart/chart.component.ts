import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-display',
  standalone:true,
  imports:[NgxChartsModule,CommonModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  chartData: any[] = [];
  view: [number, number] = [700, 400];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.users = this.workoutService.getWorkouts();
  }

  selectUser(user: any): void {
    this.selectedUser = user;
    this.prepareChartData();
  }

  prepareChartData(): void {
    this.chartData = this.selectedUser.workouts.map((workout: any) => ({
      name: workout.type,
      value: workout.minutes
    }));
  }
}
