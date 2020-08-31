import { Component, OnInit, ViewEncapsulation, AfterViewInit, Input } from "@angular/core";
import { AlertService } from "app/services/alert.service";
import { MatSnackBar, MatDialog } from "@angular/material";
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from "@angular/forms";
import { Helpers } from "app/helpers/helpers";
import { Video } from "app/models/video.model";
import { VideoService } from "app/services/video.service";
import { NetworkDriveService } from "app/services/network-drive.service";
@Component({
  selector: "cloudview-add-video",
  templateUrl: "./add-video.component.html",
  styleUrls: ["./add-video.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AddVideoComponent implements OnInit, AfterViewInit {
  @Input() id: number;
  video: Video;
  videoForm: FormGroup;
  heading: any = 'Add Video';
  networkDriveList: any;
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private alertService: AlertService,
    private videoService: VideoService,
    private networkDriveService: NetworkDriveService
  ) { }

  ngOnInit() {
    this.buildVideoForm();
    this.networkDriveService.getAll().subscribe(response => {
      this.networkDriveList = response.data;
    });
  }

  ngAfterViewInit() {
    if (this.id != undefined) {
      this.videoService.getById(this.id).subscribe(response => {
        this.video = response.data;
        this.buildVideoForm(this.video);
        this.heading = 'Edit Video';
      });
    }
  }

  buildVideoForm(val: any = {}) {
    this.videoForm = this.fb.group({
      id: [val.id],
      name: [val.name, [Validators.required]],
      description: [val.description],
      source: [val.source, [Validators.required]],
      network_drive_id: [val.network_drive_id]
    });
  }

  get name() {
    return this.videoForm.get("name");
  }

  get description() {
    return this.videoForm.get("description");
  }

  get source() {
    return this.videoForm.get("source");
  }

  get network_drive_id() {
    return this.videoForm.get("network_drive_id");
  }

  send(formDirective: FormGroupDirective) {
    const getFormValue = this.videoForm.value;
    if (this.videoForm.valid) {
      if (!getFormValue.id) {
        this.videoService.create(getFormValue).subscribe(
          response => {
            this.dialog.closeAll();
            this.snackBar.open("Video Saved Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center"
            });
            formDirective.resetForm();
            this.videoForm.reset();
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
        this.videoService.update(getFormValue).subscribe(
          response => {
            this.dialog.closeAll();
            this.snackBar.open("Video Updated Successfully.", "", {
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
