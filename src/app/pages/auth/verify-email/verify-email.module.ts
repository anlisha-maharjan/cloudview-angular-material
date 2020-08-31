import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { VerifyEmailRoutingModule } from "./verify-email-routing.module";
import { VerifyEmailComponent } from "./verify-email.component";
import { MaterialModule } from "app/shared/material-components.module";
import { AuthenticationService } from "app/services/authentication.service";
import { AlertService } from "app/services/alert.service";
@NgModule({
  imports: [
    CommonModule,
    VerifyEmailRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [VerifyEmailComponent],
  providers: [AuthenticationService, AlertService]
})
export class VerifyEmailModule {}
