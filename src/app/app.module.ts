import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { LocalStorageModule } from "angular-2-local-storage";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { TrainingComponent } from "./training/training.component";
import { CurrentTrainingComponent } from "./training/current-training/current-training.component";
import { NewTrainingComponent } from "./training/new-training/new-training.component";
import { PastTrainingsComponent } from "./training/past-trainings/past-trainings.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AppRoutingModule } from "./app-routing.module";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";
import { HeaderComponent } from "./navigation/header/header.component";
import { StopTrainingComponent } from "./training/current-training/stop-training.component";

import { AuthService } from "./auth/auth.service";
import { TrainingService } from "./training/training.service";
import { environment } from "src/environments/environment";
import { UIService } from "./shared/ui.service";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    WelcomeComponent,
    SidenavListComponent,
    HeaderComponent,
    StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    LocalStorageModule.withConfig({
      prefix: "fitness-app",
      storageType: "localStorage"
    })
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule {}
