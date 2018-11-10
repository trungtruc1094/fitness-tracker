import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  toggleSidenav = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }

    this.authSubscription = this.authService.authChange.subscribe(result => {
      this.isAuth = result;
    });
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
