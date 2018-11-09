import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class UIService {
  loadingStateChanges = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message, action, duration) {
    this.snackBar.open(message, action, {
      duration: duration
    });
  }
}
