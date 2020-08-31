import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
  Input, Output, EventEmitter
} from "@angular/core";
import { AlertService } from "app/services/alert.service";
import { MatSnackBar, MatDialog } from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import { Helpers } from "app/helpers/helpers";
import { NetworkDrive } from "app/models/network-drive.model";
import { NetworkDriveService } from "app/services/network-drive.service";
@Component({
  selector: "cloudview-add-network-drive",
  templateUrl: "./add-network-drive.component.html",
  styleUrls: ["./add-network-drive.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AddNetworkDriveComponent implements OnInit, AfterViewInit {
  @Input() id: number;
  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();
  networkDrive: NetworkDrive;
  networkDriveForm: FormGroup;
  heading: any = "Add Network Drive";

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private alertService: AlertService,
    private networkDriveService: NetworkDriveService
  ) {}

  ngOnInit() {
    this.buildNetworkDriveForm();
  }

  ngAfterViewInit() {
    // edit mode
    if (this.id != undefined) {
      this.networkDriveService.getById(this.id).subscribe(response => {
        this.networkDrive = response.data;
        this.buildNetworkDriveForm(this.networkDrive);
        this.heading = "Edit Network Drive";
      });
    }
  }

  buildNetworkDriveForm(val: any = {}) {
    this.networkDriveForm = this.fb.group({
      id: [val.id],
      name: [val.name, [Validators.required]],
      path: [val.path, [Validators.required]]
    });
  }

  get name() {
    return this.networkDriveForm.get("name");
  }

  get path() {
    return this.networkDriveForm.get("path");
  }

  send(formDirective: FormGroupDirective) {
    const getFormValue = this.networkDriveForm.value;
    if (this.networkDriveForm.valid) {
      if (!getFormValue.id) {
        this.networkDriveService.create(getFormValue).subscribe(
          response => {
            this.dialog.closeAll();
            this.refresh.emit(true);
            this.snackBar.open("Network Drive Saved Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center"
            });
            formDirective.resetForm();
            this.networkDriveForm.reset();
          },
          err => {
            const error = err.error;
            this.alertService.showMessage(
              "Error",
              Helpers.parseMessage(error.errors ? error.errors : error.message),
              "dialog",
              ""
            );
          }
        );
      } else {
        this.networkDriveService.update(getFormValue).subscribe(
          response => {
            this.dialog.closeAll();
            this.refresh.emit(true);
            this.snackBar.open("Network Drive Updated Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center"
            });
          },
          err => {
            const error = err.error;
            this.alertService.showMessage(
              "Error",
              Helpers.parseMessage(error.errors ? error.errors : error.message),
              "dialog",
              ""
            );
          }
        );
      }
    }
  }
}
