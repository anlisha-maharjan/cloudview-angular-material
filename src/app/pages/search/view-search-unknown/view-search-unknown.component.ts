import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  TemplateRef,
  ElementRef,
  QueryList,
  AfterViewInit,
} from "@angular/core";
import { MatDialog, MatSnackBar, MatPaginator } from "@angular/material";
import { SearchService } from "app/services/search.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "app/services/alert.service";
import { Helpers } from "app/helpers/helpers";
import { UnknownFaceService } from "app/services/unknown-face.service";
import * as _moment from "moment";
const moment = _moment;
@Component({
  selector: "cloudview-view-search-unknown",
  templateUrl: "./view-search-unknown.component.html",
  styleUrls: ["./view-search-unknown.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ViewSearchUnknownComponent implements OnInit, AfterViewInit {
  dataList: any[];
  deleteId: number;
  unknownFaceId: number;
  allUnknownFaceSelected: boolean = false;
  unknownPersonIds: any = [];
  @ViewChildren("unknownFace", { read: ElementRef })
  unknownFaceElementRefs: QueryList<ElementRef>;
  pageLength = 0;
  pageSize = 20;
  // filter params
  start_time: any = "";
  end_time: any = "";
  source_id: any = [];
  person_id: any = [];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private unknownFaceService: UnknownFaceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      this.start_time = queryParams.get("start_time")
        ? moment(queryParams.get("start_time")).utc().format("YYYY-MM-DD HH:mm")
        : "";
      this.end_time = queryParams.get("end_time")
        ? moment(queryParams.get("end_time")).utc().format("YYYY-MM-DD HH:mm")
        : "";
      this.source_id = queryParams.getAll("source_id")
        ? queryParams.getAll("source_id")
        : [];
      this.person_id = queryParams.getAll("person_id")
        ? queryParams.getAll("person_id")
        : [];
    });
    this.getDataList();
  }

  getDataList() {
    this.searchService
      .getAllUnknown(
        this.paginator.pageIndex + 1,
        this.start_time,
        this.end_time,
        this.source_id,
        this.person_id
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

  ngAfterViewInit() {
    this.unknownFaceElementRefs.changes.subscribe((c) => {
      c.toArray().forEach((item, index) => {
        let context = item.nativeElement.getContext("2d");
        let source = new Image();
        source.onload = () => {
          context.drawImage(
            source,
            this.dataList[index].bbox.x,
            this.dataList[index].bbox.y,
            this.dataList[index].bbox.w,
            this.dataList[index].bbox.h,
            50,
            10,
            this.dataList[index].bbox.w,
            this.dataList[index].bbox.h
          );
        };
        source.src = this.dataList[index].frame.image;
      });
    });
  }

  selectAllUnknownFace() {
    this.allUnknownFaceSelected = !this.allUnknownFaceSelected;
    if (this.allUnknownFaceSelected) {
      this.dataList.forEach((element) => {
        if (this.unknownPersonIds.includes(element.id)) {
        } else {
          this.unknownPersonIds.push(element.id);
        }
      });
    } else {
      this.unknownPersonIds = [];
    }
  }

  selectUnknownFace(item) {
    if (this.unknownPersonIds.includes(item.id)) {
      this.unknownPersonIds = this.unknownPersonIds.filter(
        (x) => x !== item.id
      );
    } else {
      this.unknownPersonIds.push(item.id);
    }
  }

  openDeleteModal(templateRef: TemplateRef<any>, row) {
    this.deleteId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      panelClass: "default-alert-pop",
    });
  }

  openCreatePersonModal(templateRef: TemplateRef<any>, row) {
    this.unknownFaceId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: "80rem",
      panelClass: "default-add-pop",
    });
  }

  openAssociatePersonModal(templateRef: TemplateRef<any>, row) {
    this.unknownFaceId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: "50rem",
      panelClass: "default-add-pop",
    });
  }

  deleteRow() {
    this.unknownFaceService.delete(this.deleteId).subscribe(
      (data) => {
        this.snackBar.open("Unknown Face Deleted Successfully.", "", {
          duration: 2000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
        });
        this.getDataList();
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

  openDeleteMultipleModal(templateRef: TemplateRef<any>) {
    if (this.unknownPersonIds && this.unknownPersonIds.length > 0) {
      const dialogRef = this.dialog.open(templateRef, {
        panelClass: "default-alert-pop",
      });
    }
  }

  openAssociatePersonMultipleModal(templateRef: TemplateRef<any>) {
    if (this.unknownPersonIds && this.unknownPersonIds.length > 0) {
      const dialogRef = this.dialog.open(templateRef, {
        width: "50rem",
        panelClass: "default-add-pop",
      });
    }
  }

  openCreatePersonMultipleModal(templateRef: TemplateRef<any>) {
    if (this.unknownPersonIds && this.unknownPersonIds.length > 0) {
      const dialogRef = this.dialog.open(templateRef, {
        width: "80rem",
        panelClass: "default-add-pop",
      });
    }
  }

  deleteMultipleRow() {
    this.unknownFaceService.deleteMultiple(this.unknownPersonIds).subscribe(
      (data) => {
        this.snackBar.open("Unknown Face Deleted Successfully.", "", {
          duration: 2000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
        });
        this.getDataList();
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

  onPageChange(event) {
    this.getDataList();
  }
}
