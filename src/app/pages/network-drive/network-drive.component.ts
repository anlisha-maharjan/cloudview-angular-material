import {
  ViewChild,
  TemplateRef,
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatSnackBar,
} from "@angular/material";
import { Router } from "@angular/router";
import { AlertService } from "app/services/alert.service";
import { Helpers } from "app/helpers/helpers";
import { NetworkDriveService } from "app/services/network-drive.service";
import { MediaMatcher } from "@angular/cdk/layout";

@Component({
  selector: "cloudview-network-drive",
  templateUrl: "./network-drive.component.html",
  styleUrls: ["./network-drive.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NetworkDriveComponent implements OnInit, AfterViewInit {
  networkDriveList: any[];
  networkDrive: any = {};
  networkDriveFolderList: any[];
  networkDriveFolder: any = {};
  videoList: any[];
  showVideoBlock: boolean = true;
  deleteId: number;
  deleteFolderId: number;
  editFolderId: number;
  editId: number;
  pageLength = 0;
  pageSize = 20;
  folderPageLength = 0;
  folderPageSize = 20;
  videoPageLength = 0;
  videoPageSize = 20;
  step = 0;
  search: string;
  timeout: any = null;

  windowWidth: number;

  mobileQuery: MediaQueryList;

  @ViewChild("paginator", { read: MatPaginator }) paginator: MatPaginator;
  @ViewChild("folderPaginator", { read: MatPaginator })
  folderPaginator: MatPaginator;
  @ViewChild("videoPaginator", { read: MatPaginator })
  videoPaginator: MatPaginator;

  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private networkDriveService: NetworkDriveService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 960px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getNetworkDriveList();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {}

  getWindowWidth() {}

  onPageChange(event) {
    this.getNetworkDriveList();
  }

  onFolderPageChange(event) {
    this.getNetworkDriveFolderList();
  }

  onVideoPageChange(event) {
    this.getVideoList();
  }

  getNetworkDriveList() {
    this.networkDriveService.getAll(this.paginator.pageIndex + 1).subscribe(
      (response) => {
        this.networkDriveList = response.data;
        this.pageLength = response.meta.total_count;
        if (response.data && response.data.length > 0) {
          this.networkDrive = response.data[0];
          this.getNetworkDriveFolderList();
        }
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

  setStep(index: number, data) {
    this.step = index;
    this.networkDrive = data;
    this.showVideoBlock = false;
    this.getNetworkDriveFolderList();
  }

  searchVideo(event: any) {
    this.search = event.target.value;
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.getVideoList();
      }
    }, 1000);
  }

  getNetworkDriveFolderList() {
    this.networkDriveService
      .getFolder(
        this.networkDrive.id,
        this.folderPaginator ? this.folderPaginator.pageIndex + 1 : 1
      )
      .subscribe(
        (response) => {
          this.networkDriveFolderList = response.data;
          this.folderPageLength = response.meta.total_count;
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

  setNetworkDriveFolder(data) {
    this.networkDriveFolder = data;
    this.showVideoBlock = true;
    this.getVideoList();
  }

  getVideoList() {
    this.networkDriveService
      .getFolderVideo(
        this.networkDrive.id,
        this.networkDriveFolder.id,
        this.videoPaginator ? this.videoPaginator.pageIndex + 1 : 1,
        this.search
      )
      .subscribe(
        (response) => {
          this.videoList = response.data;
          this.videoPageLength = response.meta.total_count;
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

  openDeleteModal(templateRef: TemplateRef<any>, row) {
    this.deleteId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      panelClass: "default-alert-pop",
    });
  }

  openAddFolderModal(templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef, {
      width: "80rem",
      panelClass: "default-add-pop",
    });
  }

  openEditFolderModal(templateRef: TemplateRef<any>, row) {
    this.editFolderId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: "80rem",
      panelClass: "default-add-pop",
    });
  }

  openDeleteFolderModal(templateRef: TemplateRef<any>, row) {
    this.deleteFolderId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      panelClass: "default-alert-pop",
    });
  }

  onAnalyzeFolder(item) {
    this.networkDriveService
      .analyzeFolder(this.networkDrive.id, item.id)
      .subscribe(
        (data) => {
          this.snackBar.open("Analyzed successfully.", "", {
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

  deleteRow() {
    this.networkDriveService.delete(this.deleteId).subscribe(
      (data) => {
        this.snackBar.open("Network Drive Deleted Successfully.", "", {
          duration: 2000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
        });
        this.getNetworkDriveList();
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

  deleteFolderRow() {
    this.networkDriveService
      .deleteFolder(this.networkDrive.id, this.deleteFolderId)
      .subscribe(
        (data) => {
          this.snackBar.open("Folder Deleted Successfully.", "", {
            duration: 2000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
          });
          this.getNetworkDriveFolderList();
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
