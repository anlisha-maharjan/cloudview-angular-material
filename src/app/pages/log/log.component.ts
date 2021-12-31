import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
} from "@angular/core";
import { MatDialog, MatSnackBar, MatPaginator } from "@angular/material";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
} from "@angular/forms";
import { AlertService } from "app/services/alert.service";
import { Helpers } from "app/helpers/helpers";
import { LogService } from "app/services/log.service";
import { AngularTokenService } from "angular-token";
import { HttpClient } from "@angular/common/http";
import * as _moment from "moment";
const moment = _moment;
@Component({
  selector: "cloudview-log",
  templateUrl: "./log.component.html",
  styleUrls: ["./log.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LogComponent implements OnInit, AfterViewInit {
  user: any;
  logData: any;
  pageLength = 0;
  pageSize = 20;
  logForm: FormGroup;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private tokenService: AngularTokenService,
    private logService: LogService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.user = this.tokenService.currentUserData;
    this.buildLogForm();
  }

  buildLogForm() {
    this.logForm = this.fb.group({
      user_id: [this.user.id],
      type: ["train", [Validators.required]],
      date: [moment().format("YYYY-MM-DD"), [Validators.required]],
    });
  }

  get type() {
    return this.logForm.get("type");
  }

  get date() {
    return this.logForm.get("date");
  }

  ngAfterViewInit() {}

  onTypeChange(event) {
    const getFormValue = this.logForm.value;
    getFormValue.date = getFormValue.date
      ? moment(getFormValue.date).format("YYYY-MM-DD")
      : "";
    if (this.logForm.valid) {
      this.logService.getLog(getFormValue).subscribe(
        (response) => {
          if (response.data && response.data.content) {
            this.logData = response.data.content.split("\n");
          } else {
            this.logData = [];
          }
          this.snackBar.open("Log fetched Successfully.", "", {
            duration: 2000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
          });
        },
        (err) => {
          const error = err.error;
          this.alertService.showMessage(
            "Error",
            Helpers.parseMessage(error.error ? error.error : error.message),
            "dialog",
            ""
          );
        }
      );
    }
  }

  onDateChange(event) {
    const getFormValue = this.logForm.value;
    getFormValue.date = getFormValue.date
      ? moment(getFormValue.date).format("YYYY-MM-DD")
      : "";
    if (this.logForm.valid) {
      this.logService.getLog(getFormValue).subscribe(
        (response) => {
          if (response.data && response.data.content) {
            this.logData = response.data.content.split("\n");
          } else {
            this.logData = [];
          }
          this.snackBar.open("Log fetched Successfully.", "", {
            duration: 2000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
          });
        },
        (err) => {
          const error = err.error;
          this.alertService.showMessage(
            "Error",
            Helpers.parseMessage(error.error ? error.error : error.message),
            "dialog",
            ""
          );
        }
      );
    }
  }

  send(formDirective: FormGroupDirective) {
    const getFormValue = this.logForm.value;
    getFormValue.date = getFormValue.date
      ? moment(getFormValue.date).format("YYYY-MM-DD")
      : "";
    if (this.logForm.valid) {
      this.logService.getLog(getFormValue).subscribe(
        (response) => {
          if (response.data && response.data.content) {
            this.logData = response.data.content.split("\n");
          } else {
            this.logData = [];
          }
          this.snackBar.open("Log fetched Successfully.", "", {
            duration: 2000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
          });
        },
        (err) => {
          const error = err.error;
          this.alertService.showMessage(
            "Error",
            Helpers.parseMessage(error.error ? error.error : error.message),
            "dialog",
            ""
          );
        }
      );
    }
  }
}
