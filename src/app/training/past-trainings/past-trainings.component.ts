import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Exercise } from "../exercise.model";
import { TrainingService } from "../training.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-past-trainings",
  templateUrl: "./past-trainings.component.html",
  styleUrls: ["./past-trainings.component.css"]
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  finishedExercises: Exercise[] = [];
  exFinishedSubscription: Subscription;
  displayedColumns: string[] = [
    "id",
    "name",
    "duration",
    "calories",
    "date",
    "state"
  ];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.trainingService.fetchCompletedAndCancelledExercises();
    this.exFinishedSubscription = this.trainingService.finishedExercisesChanged.subscribe(
      exercises => {
        this.dataSource.data = exercises;
      }
    );
    this.dataSource.paginator = this.paginator;
    // this.dataSource.data = this.finishedExercises;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  doFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
}
