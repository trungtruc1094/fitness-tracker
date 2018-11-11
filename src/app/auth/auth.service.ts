import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Subject } from "rxjs/Subject";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { TrainingService } from "../training/training.service";
import { Store } from '@ngrx/store';

import { LocalStorageService } from "angular-2-local-storage";
import { UIService } from "../shared/ui.service";
import * as fromRoot from '../app.reducer';

import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';
// import { BehaviorSubject, ReplaySubject } from "rxjs";

@Injectable()
export class AuthService {
  // authChange = new Subject<boolean>();
  private user: User;

  token: String = "";
  current_user: any;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private localStorageService: LocalStorageService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // this.authChange.next(true);
        this.store.dispatch(new Auth.Authenticated());
        this.router.navigate(["/training"]);
      } else {
        this.trainingService.cancelSubscriptions();
        // this.authChange.next(false);
        this.store.dispatch(new Auth.Unauthenticated());
        this.router.navigate(["/login"]);
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanges.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanges.next(false);
        this.store.dispatch(new UI.StopLoading());
        // Save to local storage
        const currentUserToken = this.afAuth.auth.currentUser.getIdToken();
        this.localStorageService.set("isLoggedIn", true);
        this.localStorageService.set("token", currentUserToken);
        this.localStorageService.set(
          "current_user",
          this.afAuth.auth.currentUser
        );
      })
      .catch(error => {
        // this.uiService.loadingStateChanges.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanges.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanges.next(false);
        this.store.dispatch(new UI.StopLoading());
        // Save to local storage
        const currentUserToken = JSON.parse(
          JSON.stringify(this.afAuth.auth.currentUser)
        ).stsTokenManager.accessToken;
        // console.log("currentUserToken", currentUserToken);
        this.localStorageService.set("isLoggedIn", true);
        this.localStorageService.set("token", currentUserToken);
        this.localStorageService.set(
          "current_user",
          this.afAuth.auth.currentUser
        );
      })
      .catch(error => {
        // this.uiService.loadingStateChanges.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  logout() {
    this.afAuth.auth.signOut();

    // Remove current user & token
    this.token = "";
    this.current_user = "";
    // Remove current user & token from local
    this.localStorageService.set("isLoggedIn", false);
    this.localStorageService.remove("token", "current_user");
  }

  getUser() {
    return { ...this.current_user };
  }

  isAuth() {
    if (this.localStorageService.get("isLoggedIn")) {
      if (this.localStorageService.get("current_user")) {
        this.current_user = this.localStorageService.get("current_user");
      }
      if (this.localStorageService.get("token")) {
        this.token = this.localStorageService.get("token").toString();
      }
      return true;
    } else {
      return false;
    }
  }
}
