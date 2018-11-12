import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { TrainingService } from "./training.service";

import * as fromTraining from "./training.reducer";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"]
})
export class TrainingComponent implements OnInit {
  startedTraining$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.startedTraining$ = this.store.select(fromTraining.getIsTraining);
  }
}
