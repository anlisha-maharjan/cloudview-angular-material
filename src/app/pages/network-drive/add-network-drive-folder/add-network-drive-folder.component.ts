import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { AlertService } from "app/services/alert.service";
import { MatSnackBar, MatDialog } from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import { Helpers } from "app/helpers/helpers";
import { NetworkDriveFolder } from "app/models/network-drive-folder.model";
import { NetworkDriveService } from "app/services/network-drive.service";
@Component({
  selector: "cloudview-add-network-drive-folder",
  templateUrl: "./add-network-drive-folder.component.html",
  styleUrls: ["./add-network-drive-folder.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddNetworkDriveFolderComponent implements OnInit, AfterViewInit {
  @Input() id: number;
  @Input() networkDriveid: number;
  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();
  networkDriveFolder: NetworkDriveFolder;
  networkDriveFolderForm: FormGroup;
  heading: any = "Add Folder";

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private alertService: AlertService,
    private networkDriveService: NetworkDriveService
  ) {}

  ngOnInit() {
    this.buildNetworkDriveFolderForm();
  }

  ngAfterViewInit() {
    // edit mode
    if (this.id != undefined) {
      this.networkDriveService
        .getFolderById(this.networkDriveid, this.id)
        .subscribe(
          (response) => {
            this.networkDriveFolder = response.data;
            this.buildNetworkDriveFolderForm(this.networkDriveFolder);
            this.heading = "Edit Folder";
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

  buildNetworkDriveFolderForm(val: any = {}) {
    this.networkDriveFolderForm = this.fb.group({
      id: [val.id],
      name: [val.name, [Validators.required]],
      folder_path: [val.path, [Validators.required]],
    });
  }

  get name() {
    return this.networkDriveFolderForm.get("name");
  }

  get folder_path() {
    return this.networkDriveFolderForm.get("folder_path");
  }

  send(formDirective: FormGroupDirective) {
    const getFormValue = this.networkDriveFolderForm.value;
    if (this.networkDriveFolderForm.valid) {
      if (!getFormValue.id) {
        this.networkDriveService
          .createFolder(this.networkDriveid, getFormValue)
          .subscribe(
            (response) => {
              this.dialog.closeAll();
              this.refresh.emit(true);
              this.snackBar.open("Folder Saved Successfully.", "", {
                duration: 2000,
                verticalPosition: "bottom",
                horizontalPosition: "center",
              });
              formDirective.resetForm();
              this.networkDriveFolderForm.reset();
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
      } else {
        this.networkDriveService
          .updateFolder(this.networkDriveid, getFormValue)
          .subscribe(
            (response) => {
              this.dialog.closeAll();
              this.refresh.emit(true);
              this.snackBar.open("Folder Updated Successfully.", "", {
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
}
