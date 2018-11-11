import { NgModule } from "@angular/core";

import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";

import { AngularFirestoreModule } from "@angular/fire/firestore";
import { SharedModule } from "../shared/shared.module";
import { TrainingRouteModule } from "./training-route.module";
import { StoreModule } from '@ngrx/store';
import { TrainingReducer } from "./training.reducer";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent
  ],
  imports: [
    AngularFirestoreModule, SharedModule, TrainingRouteModule,
    StoreModule.forFeature('training', TrainingReducer)],
  exports: [],
  entryComponents: []
})
export class TrainingModule {}
