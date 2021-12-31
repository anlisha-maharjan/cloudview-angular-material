import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation
} from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "app/services/user.service";
import { AlertService } from "app/services/alert.service";
import { MatSnackBar, ErrorStateMatcher } from "@angular/material";
import { AuthenticationService } from "app/services/authentication.service";
import { Helpers } from "app/helpers/helpers";
// Password and confirm password validation
const passwordValidator: ValidatorFn = (ctrl: FormGroup) => {
  if (ctrl.get("password").value && ctrl.get("confirmPassword").value) {
    const password = ctrl.get("password").value;
    const confirmPassword = ctrl.get("confirmPassword").value;
    if (password !== confirmPassword) {
      ctrl.get("confirmPassword").setErrors({ ConfirmPassword: true });
      return { error: true };
    } else {
      return null;
    }
  }
};
@Component({
  selector: "cloudview-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  inputType = "password";
  visible = false;
  confirmPwdInputType = "password";
  confirmPwdVisible = false;
  oldPwdInputType = "password";
  oldPwdvisible = false;
  uid: any;
  client: any;
  accessToken: any;
  isSpinnerVisible:boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.client = params['client'];
      this.accessToken = params['access-token'];
    });
    this.resetForm = this.fb.group(
      {
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", Validators.required],
        oldPassword: [""]
      },
      { validator: passwordValidator }
    );
  }

  get password() {
    return this.resetForm.get("password");
  }

  get confirmPassword() {
    return this.resetForm.get("confirmPassword");
  }

  get oldPassword() {
    return this.resetForm.get("oldPassword");
  }

  reset() {
    const getFormValue = this.resetForm.value;
    if (this.resetForm.valid) {
      this.isSpinnerVisible = true;
      this.authService.resetPassword(getFormValue.password, getFormValue.confirmPassword, getFormValue.oldPassword,
        this.uid, this.client, this.accessToken).subscribe(
          response => {
            this.isSpinnerVisible = false;
            this.snackBar.open("Password changed successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center"
            });
            setTimeout(() => {
              // navigate to login after 2 seconds.
              this.router.navigate(["/login"]);
            }, 2000);
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

  toggleVisibility() {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  toggleConfirmPwdVisibility() {
    if (this.confirmPwdVisible) {
      this.confirmPwdInputType = "password";
      this.confirmPwdVisible = false;
      this.cd.markForCheck();
    } else {
      this.confirmPwdInputType = "text";
      this.confirmPwdVisible = true;
      this.cd.markForCheck();
    }
  }

  toggleOldPwdVisibility() {
    if (this.oldPwdvisible) {
      this.oldPwdInputType = "password";
      this.oldPwdvisible = false;
      this.cd.markForCheck();
    } else {
      this.oldPwdInputType = "text";
      this.oldPwdvisible = true;
      this.cd.markForCheck();
    }
  }
}
