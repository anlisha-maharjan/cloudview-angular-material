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
import { Catalog } from "app/models/catalog.model";
import { CatalogService } from "app/services/catalog.service";

@Component({
  selector: "cloudview-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class CatalogComponent implements OnInit, AfterViewInit {
  datatable: any;
  deleteId: number;
  editId: number;
  catalog: Catalog[];
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
  constructor(
    private router: Router,
    private alertService: AlertService,
    private dataService: DataService,
    private catalogService: CatalogService,
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
      "catalogs",
      this.filter,
      this.paginator.pageIndex,
      function(response) {
        _self.pageLength = response.length;
        const data: Array<Catalog> = [];
        response.data.map(row => {
          const catalog: any = {
            id: row.id,
            name: row.name,
            description: (row.description.length > 100) ? row.description.replace(/(<([^>]+)>)/ig,"").substring(0, 100) + '...' : row.description.replace(/(<([^>]+)>)/ig,"")
          };
          data.push(catalog);
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
        name: "DESCRIPTION",
        property: "description",
        visible: true,
        isModelProperty: true
      },
      {
        name: "ACTION",
        property: "actions",
        visible: this.tableActions
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
      width: "60rem",
      panelClass: "default-add-pop"
    });
  }

  openEditModal(templateRef: TemplateRef<any>, row) {
    this.editId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: "60rem",
      panelClass: "default-add-pop"
    });
  }

  deleteRow() {
    this.catalogService.delete(this.deleteId).subscribe(
      data => {
        this.snackBar.open("Catalog Deleted Successfully.", "", {
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