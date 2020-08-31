import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";

import "hammerjs"; // Needed for Touch functionality of Material Components
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ErrorAlertComponent } from "./shared/alert/error-alert/error-alert.components";
import { AlertDialogComponent } from "./shared/alert/alert-dialog/alert-dialog.components";
import { AlertInfoComponent } from "./shared/alert/alert-info/alert-info.components";
import { ErrorAlertModule } from "./shared/alert/error-alert/error-alert.module";
import { AlertDialogModule } from "./shared/alert/alert-dialog/alert-dialog.module";
import { AlertInfoModule } from "./shared/alert/alert-info/alert-info.module";
import { AuthGuard } from "./guards";
import { UserService } from "./services/user.service";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { AuthenticationService } from "./services/authentication.service";
import { AngularTokenModule } from "angular-token";
@NgModule({
  imports: [
    // Angular Core Module // Don't remove!
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ErrorAlertModule,
    AlertDialogModule,
    AlertInfoModule,
    MatDatepickerModule,
    // cloudview Core Modules
    CoreModule,
    AppRoutingModule,
    AngularTokenModule.forRoot({
      apiBase: "http://50.19.163.146/api/v1",
      apiPath: null,

      signInPath: "auth/sign_in",
      signInRedirect: null,
      signInStoredUrlStorageKey: null,

      signOutPath: "auth/sign_out",
      validateTokenPath: "auth/validate_token",
      signOutFailedValidate: false,

      registerAccountPath: "auth",
      deleteAccountPath: "auth",
      registerAccountCallback: window.location.href,

      updatePasswordPath: "auth",
      resetPasswordPath: "auth/password",
      resetPasswordCallback: window.location.href,

      oAuthBase: window.location.origin,
      oAuthPaths: {
        github: "auth/github"
      },
      oAuthCallbackPath: "oauth_callback",
      oAuthWindowType: "newWindow",
      oAuthWindowOptions: null
    }),
    // Register a Service Worker (optional)
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    }),

    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  declarations: [AppComponent],
  providers: [AuthGuard, UserService, AuthenticationService],
  entryComponents: [
    ErrorAlertComponent,
    AlertDialogComponent,
    AlertInfoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
