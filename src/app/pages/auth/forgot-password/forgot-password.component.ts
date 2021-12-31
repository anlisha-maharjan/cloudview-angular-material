import { AlertService } from "./../../../services/alert.service";
import {
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { AuthenticationService } from "app/services/authentication.service";
import { Helpers } from "app/helpers/helpers";

@Component({
  selector: 'cloudview-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  isSpinnerVisible:boolean = false;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.forgotForm.get("email");
  }

  forgotPassword(formDirective: FormGroupDirective) {
    if (this.forgotForm.valid) {
      this.isSpinnerVisible = true;
      const getFormValue = this.forgotForm.value;
      this.authService.forgotPassword(getFormValue.email).subscribe(
        response => {
          this.alertService.showInfoMessage("Info", "An email has been sent containing instructions for resetting your password.",
            "dialog", "");
          formDirective.resetForm();
          this.forgotForm.reset();
          this.isSpinnerVisible = false;
        },
        err => {
          this.isSpinnerVisible = false;
          const error = err.error;
          this.alertService.showMessage(
            "Error",
            Helpers.parseMessage(error.errors ? error.errors : ''),
            "dialog",
            ""
          );
        }
      );
    }
  }

}
