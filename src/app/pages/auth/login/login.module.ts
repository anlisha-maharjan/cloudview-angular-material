import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { MaterialModule } from "app/shared/material-components.module";
import { AuthenticationService } from "app/services/authentication.service";
import { AlertService } from "app/services/alert.service";
@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  providers: [AuthenticationService, AlertService]
})
export class LoginModule {}
