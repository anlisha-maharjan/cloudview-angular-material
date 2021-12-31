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
import { Router } from "@angular/router";
import { AlertService } from "app/services/alert.service";
import { Helpers } from "app/helpers/helpers";
import { UnknownFaceService } from "app/services/unknown-face.service";

@Component({
  selector: "cloudview-unknown-face",
  templateUrl: "./unknown-face.component.html",
  styleUrls: ["./unknown-face.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UnknownFaceComponent implements OnInit, AfterViewInit {
  dataList: any[];
  deleteId: number;
  unknownFaceId: number;
  unknownFaceData:any;
  allUnknownFaceSelected: boolean = false;
  unknownPersonIds: any = [];
  @ViewChildren("unknownFace", { read: ElementRef })
  unknownFaceElementRefs: QueryList<ElementRef>;
  pageLength = 0;
  pageSize = 20;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private unknownFaceService: UnknownFaceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getDataList();
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

  onPageChange(event){
    this.getDataList();
  }

  getDataList() {
    this.unknownFaceService.getAll(this.paginator.pageIndex + 1).subscribe(
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

  openViewModal(templateRef: TemplateRef<any>, row) {
    this.unknownFaceData = row;
    const dialogRef = this.dialog.open(templateRef, {
      width: "60rem",
      panelClass: "default-alert-pop",
    });
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
}
