import { Component, OnInit, ViewEncapsulation, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { AlertService } from "app/services/alert.service";
import { MatSnackBar, MatDialog } from "@angular/material";
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective } from "@angular/forms";
import { Helpers } from "app/helpers/helpers";
import { Camera } from "app/models/camera.model";
import { CameraService } from "app/services/camera.service";
@Component({
  selector: "cloudview-add-camera",
  templateUrl: "./add-camera.component.html",
  styleUrls: ["./add-camera.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AddCameraComponent implements OnInit, AfterViewInit {
  @Input() id: number;
  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();
  camera: Camera;
  cameraForm: FormGroup;
  heading: any = 'Add Camera';

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private alertService: AlertService,
    private cameraService: CameraService
  ) { }

  ngOnInit() {
    this.buildCameraForm();
  }

  ngAfterViewInit() {
    // edit mode
    if (this.id != undefined) {
      this.cameraService.getById(this.id).subscribe(response => {
        this.camera = response.data;
        this.buildCameraForm(this.camera);
        this.heading = 'Edit Camera';
      });
    }
  }

  buildCameraForm(val: any = {}) {
    this.cameraForm = this.fb.group({
      id: [val.id],
      name: [val.name, [Validators.required]],
      description: [val.description],
      camera_url: [val.camera_url, [Validators.required]],
      // status: [val.status, [Validators.required]]
    });
  }

  get name() {
    return this.cameraForm.get("name");
  }

  get description() {
    return this.cameraForm.get("description");
  }

  get camera_url() {
    return this.cameraForm.get("camera_url");
  }

  // get status() {
  //   return this.cameraForm.get("status");
  // }

  send(formDirective: FormGroupDirective) {
    // this.cameraForm.get('description').patchValue(`${this.cameraForm.get('description').value}`);
    const getFormValue = this.cameraForm.value;
    if (this.cameraForm.valid) {
      if (!getFormValue.id) {
        getFormValue.status = 'inactive';
        this.cameraService.create(getFormValue).subscribe(
          (response) => {
            this.dialog.closeAll();
            this.refresh.emit(true);
            this.snackBar.open("Camera Saved Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
            });
            formDirective.resetForm();
            this.cameraForm.reset();
          },
          (err) => {
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
        this.cameraService.update(getFormValue).subscribe(
          (response) => {
            this.dialog.closeAll();
            this.refresh.emit(true);
            this.snackBar.open("Camera Updated Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
            });
          },
          (err) => {
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
