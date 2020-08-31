import { DataService } from "app/services/table.data.service";
import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Input,
  AfterViewInit,
  TemplateRef
} from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { Router } from "@angular/router";
import { AlertService } from "app/services/alert.service";
import { ListColumn } from "app/shared/list/list-column.model";
import { TableDataSource } from "app/datasource/table.datasource";
import { tap } from "rxjs/operators";
import { merge } from "rxjs";
import { Helpers } from "app/helpers/helpers";
import { NetworkDrive } from "app/models/network-drive.model";
import { NetworkDriveService } from "app/services/network-drive.service";

@Component({
  selector: 'cloudview-network-drive',
  templateUrl: './network-drive.component.html',
  styleUrls: ['./network-drive.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NetworkDriveComponent implements OnInit, AfterViewInit {
  datatable: any;
  deleteId: number;
  editId: number;
  networkDrive: NetworkDrive[];
  tableActions: boolean;
  columns: ListColumn[] = [];
  pageLength = 0;
  pageSize = 10;
  dataSource: TableDataSource;
  filter: string;

  @Input()
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router,
    private alertService: AlertService,
    private dataService: DataService,
    private networkDriveService: NetworkDriveService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { this.dataSource = new TableDataSource(this.dataService); }

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
      "network_drives",
      this.filter,
      this.paginator.pageIndex,
      function (response) {
        _self.pageLength = response.length;
        const data: Array<NetworkDrive> = [];
        response.data.map(row => {
          const networkDrive: any = {
            id: row.id,
            name: row.name,
            path: row.path,
            createdAt: row.created_at
          };
          data.push(networkDrive);
        });
        _self.dataSource.dataSubject.next(data);
      }
    );
  }

  setTableLayout() {
    this.tableActions = true;
    this.columns = [
      {
        name: "NAME",
        property: "name",
        visible: true,
        isModelProperty: true
      },
      {
        name: "PATH",
        property: "path",
        visible: true,
        isModelProperty: true
      },
      {
        name: "CREATED AT",
        property: "createdAt",
        visible: true,
        isModelProperty: true
      }
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
      .filter(column => column.visible)
      .map(column => column.property);
  }

  openDeleteModal(templateRef: TemplateRef<any>, row) {
    this.deleteId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      panelClass: "default-alert-pop"
    });
  }

  openAddModal(templateRef: TemplateRef<any>) {
    const dialogRef = this.dialog.open(templateRef, {
      width: '50rem',
      panelClass: "default-add-pop"
    });
  }

  openEditModal(templateRef: TemplateRef<any>, row) {
    this.editId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: '50rem',
      panelClass: "default-add-pop"
    });
  }

  deleteRow() {
    this.networkDriveService.delete(this.deleteId).subscribe(
      data => {
        this.snackBar.open("Network Drive Deleted Successfully.", "", {
          duration: 2000,
          verticalPosition: "bottom",
          horizontalPosition: "center"
        });
        this.loadModel();
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
