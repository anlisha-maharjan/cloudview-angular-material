import { AlertService } from "./../../../services/alert.service";
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/services/authentication.service";
import { Helpers } from "app/helpers/helpers";
@Component({
  selector: "cloudview-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  inputType = "password";
  visible = false;
  isSpinnerVisible:boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  signin() {
    const getFormValue = this.loginForm.value;
    if (this.loginForm.valid) {
      this.isSpinnerVisible = true;
      this.authService.login(getFormValue.email, getFormValue.password).subscribe(
        response => {
          localStorage.setItem("companyName", response.body.data.company_name);
          this.router.navigate(["/search"]);
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
}
