import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Input,
  AfterViewInit,
  TemplateRef
} from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { AlertService } from "app/services/alert.service";
import { Helpers } from "app/helpers/helpers";
import { Video } from "app/models/video.model";
import { VideoService } from "app/services/video.service";

@Component({
  selector: "cloudview-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class VideoComponent implements OnInit {
  videoList: any[];
  deleteId: number;
  editId: number;
  filter: string = "all";
  constructor(
    private router: Router,
    private alertService: AlertService,
    private videoService: VideoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getVideosList();
  }

  getVideosList(filter=''){
    this.videoService.getAll(filter).subscribe(response => {
      this.videoList = response;
    });
  }

  openDeleteModal(templateRef: TemplateRef<any>, row) {
    this.deleteId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      panelClass: "default-alert-pop"
    });
  }

  openAddModal(templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef, {
      width: "80rem",
      panelClass: "default-add-pop"
    });
  }

  openEditModal(templateRef: TemplateRef<any>, row) {
    this.editId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: "80rem",
      panelClass: "default-add-pop"
    });
  }

  download(item) {}

  onSearch(event) {
    this.getVideosList(event.target.value);
  }

  filterVideos() {}

  deleteRow() {
    this.videoService.delete(this.deleteId).subscribe(
      data => {
        this.snackBar.open("Video Deleted Successfully.", "", {
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
