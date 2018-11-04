import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from "../../auth/auth.service";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Output()
  toggleSidenav = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(result => {
      this.isAuth = result;
    })
  }

  onToggleSidenav() {
    // console.log(this.toggleSidenav);
    this.toggleSidenav.emit();
  }

  logout() {
    this.authService.logout();
  }
}
