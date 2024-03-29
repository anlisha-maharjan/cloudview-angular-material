import { AlertService } from 'app/services/alert.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material-components.module';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { AuthenticationService } from 'app/services/authentication.service';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [AuthenticationService, AlertService],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule {
}
