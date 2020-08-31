import { AlertService } from "./../../../services/alert.service";
import {
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar, MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "app/services/authentication.service";
import { Helpers } from "app/helpers/helpers";

@Component({
  selector: 'cloudview-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerifyEmailComponent implements OnInit {
  verifyForm: FormGroup;
  constructor(private alertService: AlertService, private authService: AuthenticationService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
