import { Component, OnInit, OnDestroy } from "@angular/core";
import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";

import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

// export interface ExerciseId extends Exercise {
//   id: string;
// }

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // private exerciseCollection: AngularFirestoreCollection<Exercise>;
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  // private shirtCollection: AngularFirestoreCollection<Shirt>;
  // shirts: Observable<ShirtId[]>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.trainingService.fetchAvailableExercises();
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );
  }

  startTraining(form: NgForm) {
    // console.log(form.value.selectedExercise);
    // console.log(form.value.selectedExercise);
    this.trainingService.startExercise(form.value.selectedExercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
