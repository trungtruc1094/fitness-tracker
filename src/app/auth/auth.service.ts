import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Subject } from "rxjs/Subject";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { TrainingService } from "../training/training.service";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.authSuccessfully();
        this.isAuthenticated = true;
      })
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.authSuccessfully();
        this.isAuthenticated = true;
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.trainingService.getExerciseSubscriptions().forEach(ex => {
      ex.unsubscribe();
    });
    this.afAuth.auth.signOut();
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(["/login"]);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(["/training"]);
  }
}
