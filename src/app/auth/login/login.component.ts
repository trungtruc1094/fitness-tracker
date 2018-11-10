import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UIService } from "src/app/shared/ui.service";
import { Subscription } from "rxjs";
import { LocalStorageService } from "angular-2-local-storage";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanges.subscribe(result => {
      this.isLoading = result;
    });

    if (this.localStorageService.get("isLoggedIn")) {
      this.authService.current_user = this.localStorageService.get(
        "current_user"
      );
      this.authService.token = this.localStorageService.get("token").toString();
      this.router.navigate(["/training"]);
    }
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
}
