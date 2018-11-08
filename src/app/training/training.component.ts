import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { TrainingService } from "./training.service";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"]
})
export class TrainingComponent implements OnInit {
  exerciseSubscription: Subscription;
  startedTraining = false;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.trainingService.exerciseChanged.subscribe(result => {
      if (result) {
        this.startedTraining = true;
      } else {
        this.startedTraining = false;
      }
    });
  }
}
