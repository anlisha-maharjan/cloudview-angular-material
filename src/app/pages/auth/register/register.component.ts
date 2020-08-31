import { AlertService } from "./../../../services/alert.service";
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormGroupDirective } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { AuthenticationService } from "app/services/authentication.service";
import { Helpers } from "app/helpers/helpers";
// Password and confirm password validation
const passwordValidator: ValidatorFn = (ctrl: FormGroup) => {
  if (ctrl.get("password").value && ctrl.get("confirmPassword").value) {
    const password = ctrl.get("password").value;
    const confirmPassword = ctrl.get("confirmPassword").value;
    if (password !== confirmPassword) {
      ctrl.get('confirmPassword').setErrors({ ConfirmPassword: true });
      return { error: true };
    } else {
      return null;
    }
  }
};
@Component({
  selector: 'cloudview-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  inputType = "password";
  visible = false;
  confirmPwdInputType = "password";
  confirmPwdVisible = false;
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required]],
      fullName: ["", [Validators.required]],
    },
      { validator: passwordValidator });
  }

  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }
  get fullName() {
    return this.registerForm.get("fullName");
  }

  register(formDirective: FormGroupDirective) {
    const getFormValue = this.registerForm.value;
    if (this.registerForm.valid) {
      this.authService.register(getFormValue.email, getFormValue.password, getFormValue.confirmPassword, getFormValue.fullName).subscribe(
        response => {
          this.alertService.showInfoMessage("Info", "Registration successful. Please check your email for verification.", "dialog", "");
          formDirective.resetForm();
          this.registerForm.reset();
        },
        err => {
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

}
