import { DataService } from "app/services/table.data.service";
import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Input,
  AfterViewInit,
  TemplateRef,
} from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatSnackBar,
} from "@angular/material";
import { Router } from "@angular/router";
import { AlertService } from "app/services/alert.service";
import { ListColumn } from "app/shared/list/list-column.model";
import { TableDataSource } from "app/datasource/table.datasource";
import { tap } from "rxjs/operators";
import { merge } from "rxjs";
import { Helpers } from "app/helpers/helpers";
import { Camera } from "app/models/camera.model";
import { CameraService } from "app/services/camera.service";
import * as moment from "moment";

@Component({
  selector: "cloudview-camera",
  templateUrl: "./camera.component.html",
  styleUrls: ["./camera.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CameraComponent implements OnInit, AfterViewInit {
  datatable: any;
  deleteId: number;
  editId: number;
  viewId: number;
  logId: number;
  camera: Camera[];
  tableActions: boolean;
  columns: ListColumn[] = [];
  logs: any = [];
  pageLength = 0;
  pageSize = 20;
  logPageLength = 0;
  logPageSize = 20;
  dataSource: TableDataSource;
  filter: string;

  @ViewChild('paginator', {read: MatPaginator}) paginator: MatPaginator;
  @ViewChild('logPaginator', {read: MatPaginator}) logPaginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private dataService: DataService,
    private cameraService: CameraService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new TableDataSource(this.dataService);
  }

  ngOnInit() {
    this.setTableLayout();
    this.loadModel();
  }

  ngAfterViewInit() {
    this.sort.direction = "asc";
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadModel()))
      .subscribe();
  }

  loadModel() {
    const _self = this;
    this.dataSource.loadModel(
      "cameras",
      this.filter,
      this.paginator.pageIndex,
      function (response) {
        _self.pageLength = response.meta.total_count;
        const data: Array<Camera> = [];
        response.data.map((row) => {
          const camera: any = {
            id: row.id,
            name: row.name,
            status: row.status,
            state: row.state,
            camera_url: row.camera_url,
            lastProcessedAt: row.last_processed_at
              ? moment(row.last_processed_at).format("YYYY-MM-DD HH:mmA")
              : "",
            createdAt: moment(row.created_at).format("YYYY-MM-DD HH:mmA"),
          };
          data.push(camera);
        });
        _self.dataSource.dataSubject.next(data);
      }
    );
  }

  setTableLayout() {
    this.tableActions = true;
    this.columns = [
      {
        name: "STATUS",
        property: "status",
        secondproperty: "state",
        visible: true,
        isModelProperty: true,
      },
      {
        name: "NAME",
        property: "name",
        visible: true,
        isModelProperty: true,
      },
      {
        name: "LAST PROCESSED",
        property: "lastProcessedAt",
        visible: true,
        isModelProperty: true,
      },
      {
        name: "STATE",
        property: "state",
        visible: true,
        isModelProperty: true,
      },
      {
        name: "ACTION",
        property: "actions",
        visible: this.tableActions,
      },
    ] as ListColumn[];
  }

  onFilterChange(value) {
    // finds the filtered data and loads data with returned results
    this.paginator.pageIndex = 0;
    this.filter = value;
    this.loadModel();
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
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

  openViewModal(templateRef: TemplateRef<any>, row) {
    this.viewId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: "50rem",
      panelClass: "default-add-pop",
    });
  }

  openLogModal(templateRef: TemplateRef<any>, row) {
    this.logId = row.id;
    this.cameraService.log(1, row.id).subscribe(
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
    this.cameraService
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

  changeStatus(row) {
    if (row.status == "inactive") {
      this.cameraService.enableCamera(row.id).subscribe(
        (response) => {
          this.snackBar.open("Camera enabled Successfully.", "", {
            duration: 2000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
          });
          this.loadModel();
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
      this.cameraService.disableCamera(row.id).subscribe(
        (response) => {
          this.snackBar.open("Camera disabled Successfully.", "", {
            duration: 2000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
          });
          this.loadModel();
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
    // Disable camera before delete
    this.cameraService.disableCamera(this.deleteId).subscribe(
      (response) => {
        this.cameraService.delete(this.deleteId).subscribe(
          (data) => {
            this.snackBar.open("Camera Deleted Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
            });
            this.loadModel();
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
