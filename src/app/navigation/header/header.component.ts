import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { AuthService } from "../../auth/auth.service";
import * as fromRoot from '../../app.reducer';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit{
  @Output()
  toggleSidenav = new EventEmitter<void>();

  isAuth = false;
  isAuth$: Observable<boolean>;
  // authSubscription: Subscription;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }

    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  logout() {
    this.authService.logout();
  }
}
