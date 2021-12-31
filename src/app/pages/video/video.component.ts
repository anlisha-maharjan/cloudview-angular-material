import {
  ViewChild,
  TemplateRef,
  Component,
  OnInit,
  ViewChildren,
  ViewEncapsulation,
  ElementRef,
  QueryList,
  AfterViewInit,
} from "@angular/core";
import { MatDialog, MatSnackBar, MatPaginator } from "@angular/material";
import { Router } from "@angular/router";
import { AlertService } from "app/services/alert.service";
import { Helpers } from "app/helpers/helpers";
import { VideoService } from "app/services/video.service";

@Component({
  selector: "cloudview-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit, AfterViewInit {
  videoList: any[];
  deleteId: number;
  editId: number;
  logId: number;
  faceId: number;
  videoIds: any = [];
  logs: any = [];
  filter = "";
  allVideoSelected: boolean = false;
  activeVideo: any = {};
  pageLength = 0;
  pageSize = 20;
  logPageLength = 0;
  logPageSize = 20;
  searchList: any[];
  show: boolean = false;
  showAccurancyDetail = true;
  windowWidth = window.innerWidth - 40;
  windowHeight = window.innerHeight - 40;
  customOptions: any = {
    items: 1,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
  };
  @ViewChildren("searchCanvas", { read: ElementRef })
  searchCanvasElementRefs: QueryList<ElementRef>;

  @ViewChildren("cropCanvas", { read: ElementRef })
  cropCanvasElementRefs: QueryList<ElementRef>;

  @ViewChild("videoPlayer") videoplayer: ElementRef;

  @ViewChild("paginator", { read: MatPaginator }) paginator: MatPaginator;
  @ViewChild("logPaginator", { read: MatPaginator }) logPaginator: MatPaginator;

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

  ngAfterViewInit() {
    this.searchCanvasElementRefs.changes.subscribe((c) => {
      c.toArray().forEach((item, index) => {
        if (this.searchList[index]) {
          let context = item.nativeElement.getContext("2d");
          let source = new Image();
          source.onload = () => {
            context.drawImage(source, 0, 0);
            context.beginPath();
            this.searchList[index].faces.forEach((val) => {
              context.rect(val.bbox.x, val.bbox.y, val.bbox.w, val.bbox.h);
            });
            context.strokeStyle = "#ff0000";
            context.stroke();
          };
          source.src = this.searchList[index].image_url;
        }
      });
    });
    this.cropCanvasElementRefs.changes.subscribe((a) => {
      a.toArray().forEach((data, index) => {
        let i = data.nativeElement.getAttribute("data-id");
        let j = data.nativeElement.getAttribute("data-class");
        if (
          this.searchList[i] &&
          this.searchList[i].faces &&
          this.searchList[i].faces[j]
        ) {
          let contexts = data.nativeElement.getContext("2d");
          let result = new Image();
          result.onload = () => {
            contexts.drawImage(
              result,
              this.searchList[i].faces[j].bbox.x,
              this.searchList[i].faces[j].bbox.y,
              this.searchList[i].faces[j].bbox.w,
              this.searchList[i].faces[j].bbox.h,
              50,
              10,
              this.searchList[i].faces[j].bbox.w,
              this.searchList[i].faces[j].bbox.h
            );
          };
          result.src = this.searchList[i].image_url;
        }
      });
    });
  }

  getVideosList() {
    this.videoService
      .getAll(this.paginator.pageIndex + 1, this.filter)
      .subscribe(
        (response) => {
          this.videoList = response.data;
          this.pageLength = response.meta.total_count;
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

  onPopupClose() {
    this.show = false;
    document.querySelector("body").classList.remove("canvas-pop__open");
  }

  toggleAccurancyDetail() {
    this.showAccurancyDetail = !this.showAccurancyDetail;
  }

  onAnalyze(item) {
    this.videoService.analyze(item.id).subscribe(
      (response) => {
        this.snackBar.open(response.data.message, "", {
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

  openDeleteModal(templateRef: TemplateRef<any>, row) {
    this.deleteId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      panelClass: "default-alert-pop",
    });
  }

  openAddModal(templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef, {
      width: "80rem",
      panelClass: "default-add-pop",
    });
  }

  openEditModal(templateRef: TemplateRef<any>, row) {
    this.editId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: "80rem",
      panelClass: "default-add-pop",
    });
  }

  openChangePersonModal(templateRef: TemplateRef<any>, row) {
    this.faceId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: "50rem",
      panelClass: "default-add-pop",
    });
  }

  openPersonDeleteModal(templateRef: TemplateRef<any>, row) {
    this.faceId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      panelClass: "default-alert-pop",
    });
  }

  openCreatePersonModal(templateRef: TemplateRef<any>, row) {
    this.faceId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: "80rem",
      panelClass: "default-add-pop",
    });
  }

  openAssociatePersonModal(templateRef: TemplateRef<any>, row) {
    this.faceId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: "50rem",
      panelClass: "default-add-pop",
    });
  }

  openLogModal(templateRef: TemplateRef<any>, row) {
    this.logId = row.id;
    this.videoService.log(1, row.id).subscribe(
      (response) => {
        this.logs = response.data;
        this.logPageLength = response.meta.total_count;
        const dialogRef = this.dialog.open(templateRef, {
          width: "100rem",
          panelClass: "default-alert-pop",
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

  getLogsList() {
    this.videoService
      .log(this.logPaginator.pageIndex + 1, this.logId)
      .subscribe(
        (response) => {
          this.logs = response.data;
          this.logPageLength = response.meta.total_count;
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

  onLogPageChange(event) {
    this.getLogsList();
  }

  onRefresh() {}

  deleteFace() {
    this.videoService.deletePerson(this.faceId).subscribe(
      (data) => {
        this.snackBar.open("Face Deleted Successfully.", "", {
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

  onToggle(video) {
    if (video.status === "analyzed") {
      this.videoService.getAnalyzedDetail(video.id).subscribe(
        (response) => {
          this.searchList = response.data;
          this.show = true;
          document.querySelector("body").classList.add("canvas-pop__open");
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
      if (this.videoplayer) {
        this.videoplayer.nativeElement.src = video.video_url;
        this.videoplayer.nativeElement.load();
        this.videoplayer.nativeElement.play();
      }
      this.activeVideo = video;
    }
  }

  onClose() {
    this.activeVideo = {};
  }

  onDownload(item) {
    window.open(item.video_url, "_blank");
  }

  onFilter(event) {
    this.filter = event.value;
    this.getVideosList();
  }

  onPageChange(event) {
    this.getVideosList();
  }

  selectAllVideo() {
    this.allVideoSelected = !this.allVideoSelected;
    if (this.allVideoSelected) {
      this.videoList.forEach((element) => {
        if (this.videoIds.includes(element.id)) {
        } else {
          this.videoIds.push(element.id);
        }
      });
    } else {
      this.videoIds = [];
    }
  }

  selectVideo(item) {
    if (this.videoIds.includes(item.id)) {
      this.videoIds = this.videoIds.filter((x) => x !== item.id);
    } else {
      this.videoIds.push(item.id);
    }
  }

  deleteMultiple() {
    if (this.videoIds && this.videoIds.length > 0) {
      this.videoService.deleteMultiple(this.videoIds).subscribe(
        (response) => {
          this.snackBar.open("Videos Deleted Successfully.", "", {
            duration: 2000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
          });
          this.getVideosList();
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

  deleteRow() {
    this.videoService.delete(this.deleteId).subscribe(
      (data) => {
        this.snackBar.open("Video Deleted Successfully.", "", {
          duration: 2000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
        });
        this.getVideosList();
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
