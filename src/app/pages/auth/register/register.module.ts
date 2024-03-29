import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from "./register.component";
import { MaterialModule } from "app/shared/material-components.module";
import { AuthenticationService } from "app/services/authentication.service";
import { AlertService } from "app/services/alert.service";
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  declarations: [RegisterComponent],
  providers: [AuthenticationService, AlertService]
})
export class RegisterModule {}
