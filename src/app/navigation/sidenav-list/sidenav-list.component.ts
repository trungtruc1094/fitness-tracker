import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"]
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output()
  closeSidenav = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(result => {
      this.isAuth = result;
    });
  }

  sideNavClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.sideNavClose();
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
