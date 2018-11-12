import { Component, OnInit, OnDestroy } from "@angular/core";
import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";

import { Store } from "@ngrx/store";
import * as fromTraining from "../training.reducer";
import * as fromRoot from "../../app.reducer";

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
export class NewTrainingComponent implements OnInit {
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;
  // private exerciseCollection: AngularFirestoreCollection<Exercise>;
  exercises$: Observable<Exercise[]>;
  exerciseSubscription: Subscription;

  // private shirtCollection: AngularFirestoreCollection<Shirt>;
  // shirts: Observable<ShirtId[]>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiSerivce: UIService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    // this.loadingSubs = this.uiSerivce.loadingStateChanges.subscribe(result => {
    //   this.isLoading = result;
    // });
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getSetAvailableExercises);

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
}
