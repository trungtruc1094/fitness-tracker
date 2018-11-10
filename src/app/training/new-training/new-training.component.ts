import { Component, OnInit, OnDestroy } from "@angular/core";
import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";

import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { UIService } from "src/app/shared/ui.service";

// export interface ExerciseId extends Exercise {
//   id: string;
// }

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSubs: Subscription;
  // private exerciseCollection: AngularFirestoreCollection<Exercise>;
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  // private shirtCollection: AngularFirestoreCollection<Shirt>;
  // shirts: Observable<ShirtId[]>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiSerivce: UIService
  ) {}

  ngOnInit() {
    this.loadingSubs = this.uiSerivce.loadingStateChanges.subscribe(result => {
      this.isLoading = result;
    });
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );

    this.fetchExercises();
  }

  startTraining(form: NgForm) {
    // console.log(form.value.selectedExercise);
    // console.log(form.value.selectedExercise);
    this.trainingService.startExercise(form.value.selectedExercise);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
}
