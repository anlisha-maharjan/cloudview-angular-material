import { AlertService } from "app/services/alert.service";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../../shared/material-components.module";
import { ForgotPasswordRoutingModule } from "./forgot-password-routing.module";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { AuthenticationService } from "app/services/authentication.service";

@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [AlertService, AuthenticationService],
  declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule {}
