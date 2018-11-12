import { Subject } from "rxjs/Subject";
import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { Subscription } from "rxjs";
import { UIService } from "../shared/ui.service";
import { Store } from "@ngrx/store";

import * as Training from "./training.actions";
import * as fromTraining from "./training.reducer";

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private runningExercise: Exercise;

  private finishedExercises: Exercise[] = [];

  private exercises: Exercise[] = [];

  private availableExercises: Exercise[] = [];

  private exSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercises() {
    this.uiService.loadingStateChanges.next(true);
    this.exSubscriptions.push(
      this.db
        .collection("availableExercises")
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()["name"],
                duration: doc.payload.doc.data()["duration"],
                calories: doc.payload.doc.data()["calories"]
              };
            });
            // throw Error();
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.uiService.loadingStateChanges.next(false);
            // this.availableExercises = exercises;
            // this.exercisesChanged.next([...this.availableExercises]);
            this.store.dispatch(new Training.SetAvailableExercises(exercises));
          },
          error => {
            this.uiService.loadingStateChanges.next(false);
            this.uiService.showSnackBar(
              "Fetching all available exercises is failed, please fetch again!",
              null,
              3000
            );
            this.exerciseChanged.next(null);
          }
        )
    );
  }

  startExercise(selectedId: string) {
    // this.db
    //   .doc("availableExercises/" + selectedId)
    //   .update({ lastSelected: new Date() });
    // this.runningExercise = this.availableExercises.find(
    //   ex => ex.id == selectedId
    // );
    // this.exerciseChanged.next({ ...this.runningExercise });
    this.store.dispatch(new Training.StartExercise(selectedId));
  }

  getRunningExercise() {
    return this.runningExercise;
  }

  completeExercise() {
    this.store
      .select(fromTraining.getStartExercise)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          state: "completed"
        });
        console.log("Complete: ", ex);
        // this.runningExercise = null;
      });
    // this.exerciseChanged.next(null);
    this.store.dispatch(new Training.StopExercise());
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getStartExercise)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDatabase({
          ...ex,
          duration: ex.duration * (progress / 100),
          calories: ex.duration * (progress / 100),
          date: new Date(),
          state: "cancelled"
        });
        console.log("Cancel: ", ex);
        // this.runningExercise = null;
      });
    // this.exerciseChanged.next(null);
    this.store.dispatch(new Training.StopExercise());
  }

  fetchCompletedAndCancelledExercises() {
    this.exSubscriptions.push(
      this.db
        .collection("finishedExercises")
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          // this.finishedExercisesChanged.next([...exercises]);
          this.store.dispatch(new Training.SetFinishedExercises(exercises));
        })
    );
  }

  getExerciseSubscriptions() {
    return this.exSubscriptions;
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection("finishedExercises").add(exercise);
  }

  cancelSubscriptions() {
    this.getExerciseSubscriptions().forEach(ex => {
      ex.unsubscribe();
    });
  }
}
