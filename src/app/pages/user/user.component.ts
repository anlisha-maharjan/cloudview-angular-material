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
import { User } from "app/models/user.model";
import { UserService } from "app/services/user.service";

@Component({
  selector: "cloudview-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit, AfterViewInit {
  datatable: any;
  deleteId: number;
  editId: number;
  user: User[];
  tableActions: boolean;
  columns: ListColumn[] = [];
  pageLength = 0;
  pageSize = 20;
  dataSource: TableDataSource;
  filter: string;

  @Input()
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private dataService: DataService,
    private userService: UserService,
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
      "users",
      this.filter,
      this.paginator.pageIndex,
      function (response) {
        _self.pageLength = response.meta.total_count;
        const data: Array<User> = [];
        response.data.map((row) => {
          const user: any = {
            id: row.id,
            name: row.name,
            email: row.email,
          };
          data.push(user);
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
        isModelProperty: true,
      },
      {
        name: "EMAIL",
        property: "email",
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
      width: "50rem",
      panelClass: "default-add-pop",
    });
  }

  openEditModal(templateRef: TemplateRef<any>, row) {
    this.editId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: "50rem",
      panelClass: "default-add-pop",
    });
  }

  deleteRow() {
    this.userService.delete(this.deleteId).subscribe(
      (data) => {
        this.snackBar.open("User Deleted Successfully.", "", {
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
