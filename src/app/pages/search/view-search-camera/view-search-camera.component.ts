import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation,
  ElementRef,
  QueryList,
  AfterViewInit,
} from "@angular/core";
import { MatDialog, MatSnackBar, MatPaginator } from "@angular/material";
import { SearchService } from "app/services/search.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "app/services/alert.service";
import { Helpers } from "app/helpers/helpers";
@Component({
  selector: "cloudview-view-search-camera",
  templateUrl: "./view-search-camera.component.html",
  styleUrls: ["./view-search-camera.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ViewSearchCameraComponent implements OnInit, AfterViewInit {
  dataList: any[];
  searchList: any[];
  pageLength = 0;
  pageSize = 20;
  personId: any = "";
  cameraId: any = "";
  faceId: number;
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
  @ViewChildren("personCanvas", { read: ElementRef })
  personCanvasElementRefs: QueryList<ElementRef>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private alertService: AlertService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const id = this.activatedRoute.snapshot.params["id"];
    const cameraId = this.activatedRoute.snapshot.params["cameraId"];
    if (id != undefined && cameraId != undefined) {
      this.personId = id;
      this.cameraId = cameraId;
      this.getDataList();
    }
    this.searchCanvasElementRefs.changes.subscribe((c) => {
      c.toArray().forEach((item, index) => {
        if (this.searchList[index]) {
          let context = item.nativeElement.getContext("2d");
          let source = new Image();
          source.onload = () => {
            context.drawImage(source, 0, 0);
            context.beginPath();
            context.rect(
              this.searchList[index].bbox.x,
              this.searchList[index].bbox.y,
              this.searchList[index].bbox.w,
              this.searchList[index].bbox.h
            );
            context.strokeStyle = "#ff0000";
            context.stroke();
          };
          source.src = this.searchList[index].frame.image;
        }
      });
    });
    this.personCanvasElementRefs.changes.subscribe((a) => {
      a.toArray().forEach((data, i) => {
        let contexts = data.nativeElement.getContext("2d");
        let result = new Image();
        result.onload = () => {
          contexts.drawImage(
            result,
            this.searchList[i].bbox.x,
            this.searchList[i].bbox.y,
            this.searchList[i].bbox.w,
            this.searchList[i].bbox.h,
            50,
            10,
            this.searchList[i].bbox.w,
            this.searchList[i].bbox.h
          );
        };
        result.src = this.searchList[i].frame.image;
      });
    });
  }

  getDataList() {
    this.searchService
      .getSearchPeopleBySource(
        this.paginator.pageIndex + 1,
        this.personId,
        "cameras",
        this.cameraId
      )
      .subscribe(
        (response) => {
          this.dataList = response.data;
          this.pageLength = response.meta.total_count;
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

  onToggle(item) {
    this.searchService
      .getSearchPeopleByVisitCount(
        this.personId,
        this.cameraId,
        item.visit_count_value
      )
      .subscribe(
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
  }

  onClose() {
    this.show = false;
    document.querySelector("body").classList.remove("canvas-pop__open");
  }

  toggleAccurancyDetail() {
    this.showAccurancyDetail = !this.showAccurancyDetail;
  }

  onPageChange(event) {
    this.getDataList();
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

  onRefresh() {}

  deleteFace() {
    this.searchService.delete(this.faceId).subscribe(
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
}
