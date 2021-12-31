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
import { Person } from "app/models/person.model";
import { PersonService } from "app/services/person.service";
import {
  DropzoneComponent,
  DropzoneConfigInterface,
} from "ngx-dropzone-wrapper";
import { environment } from "../../../environments/environment";
import { AngularTokenService } from "angular-token";

@Component({
  selector: "cloudview-person",
  templateUrl: "./person.component.html",
  styleUrls: ["./person.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PersonComponent implements OnInit, AfterViewInit {
  dataList: any[];
  datatable: any;
  deleteId: number;
  editId: number;
  viewId: number;
  personId: number;
  person: Person[];
  attachments: any = [];
  logId: number;
  logs: any = [];
  tableActions: boolean;
  columns: ListColumn[] = [];
  pageLength = 0;
  pageSize = 20;
  logPageLength = 0;
  logPageSize = 20;
  dataSource: TableDataSource;
  filter: string;
  allPeopleSelected: boolean = false;
  config: DropzoneConfigInterface;
  authData: any;
  personIds: any = [];
  @ViewChild("paginator", { read: MatPaginator }) paginator: MatPaginator;
  @ViewChild("logPaginator", { read: MatPaginator }) logPaginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private dataService: DataService,
    private personService: PersonService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private tokenService: AngularTokenService
  ) {
    this.dataSource = new TableDataSource(this.dataService);
  }

  ngOnInit() {
    this.setTableLayout();
    this.loadModel();
  }

  selectAllPeople() {
    this.allPeopleSelected = !this.allPeopleSelected;
    if (this.allPeopleSelected) {
      this.dataList.forEach((element) => {
        if (this.personIds.includes(element.id)) {
        } else {
          this.personIds.push(element.id);
        }
      });
    } else {
      this.personIds = [];
    }
  }

  selectPeople(item) {
    if (this.personIds.includes(item.id)) {
      this.personIds = this.personIds.filter((x) => x !== item.id);
    } else {
      this.personIds.push(item.id);
    }
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
      "people",
      this.filter,
      this.paginator.pageIndex,
      function (response) {
        _self.pageLength = response.meta.total_count;
        _self.dataList = response.data;
        const data: Array<Person> = [];
        response.data.map((row) => {
          const person: any = {
            id: row.id,
            name:
              row.firstname +
              " " +
              (row.middlename ? row.middlename : "") +
              " " +
              row.lastname,
            gender: row.gender,
            description:
              row.description && row.description !== null
                ? row.description.length > 40
                  ? row.description
                      .replace(/(<([^>]+)>)/gi, "")
                      .substring(0, 40) + "..."
                  : row.description.replace(/(<([^>]+)>)/gi, "")
                : "",
            image: row.image,
            catalog: row.catalog,
            trainingCompleted: row.training_completed,
          };
          data.push(person);
        });
        _self.dataSource.dataSubject.next(data);
      }
    );
  }

  setTableLayout() {
    this.tableActions = true;
    this.columns = [
      {
        name: "Checkbox",
        property: "checkbox",
        visible: true,
      },
      {
        name: "Image",
        property: "image",
        visible: true,
      },
      {
        name: "NAME",
        property: "name",
        visible: true,
        isModelProperty: true,
      },
      {
        name: "GENDER",
        property: "gender",
        visible: true,
        isModelProperty: true,
      },
      {
        name: "CATALOG",
        property: "catalog",
        visible: true,
        isModelProperty: true,
      },
      {
        name: "DESCRIPTION",
        property: "description",
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
      width: "100rem",
      panelClass: "default-add-pop",
    });
  }

  openEditModal(templateRef: TemplateRef<any>, row) {
    this.editId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: "100rem",
      panelClass: "default-add-pop",
    });
  }

  openViewModal(templateRef: TemplateRef<any>, row) {
    this.viewId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: "95rem",
      panelClass: "default-add-pop",
    });
  }

  openLogModal(templateRef: TemplateRef<any>, row) {
    this.logId = row.id;
    this.personService.log(1, row.id).subscribe(
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
    this.personService
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

  onFileAdded(file) {
    if (file.fullPath) {
      Object.defineProperty(file, "name", {
        writable: true,
        value: file.fullPath,
      });
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const obj = {
        file: file,
        fileName: file.name,
      };
      this.attachments.push(obj);
    };
  }

  onFileRemove(file) {
    this.attachments = this.attachments.filter((x) => x.fileName !== file.name);
  }

  openUploadModal(templateRef: TemplateRef<any>, row) {
    this.personId = row.id;
    const dialogRef = this.dialog.open(templateRef, {
      width: "80rem",
      panelClass: "default-add-pop",
    });

    this.authData = this.tokenService.currentAuthData;
    this.config = {
      clickable: true,
      acceptedFiles: "image/*",
      createImageThumbnails: true,
      autoProcessQueue: false,
      url: environment.apiUrl,
      paramName: "image",
      dictDefaultMessage:
        "Drag & Drop files/folder to upload. Only image allowed.",
      dictInvalidFileType: "Invalid File",
      previewTemplate: `
      <div class="dz-preview dz-file-preview default-file-upload__preview">
        <figure>
          <span class="dz-error-mark"><span>✘</span></span>
          <span class="dz-success-mark"><span>✔</span></span>
          <img data-dz-thumbnail />
          <i class="fa fa-file"></i>
        </figure>

        <div class="dz-details">
          <div><span data-dz-name></span></div>
          <div class="text-primary text-extra-small" data-dz-size></div>
          <div class="dz-error-message"><span data-dz-errormessage></span></div>
        </div>

        <a href="#" class="remove" data-dz-remove>
            <i class="fa fa-trash" />
          </a>
      </div>`,
    };
  }

  uploadImage() {
    this.personService.addImages(this.personId, this.attachments).subscribe(
      (data) => {
        this.dialog.closeAll();
        this.snackBar.open("Images uploaded Successfully.", "", {
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

  trainPerson(item) {
    this.personService.train(item.id).subscribe(
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

  trainMultiplePerson() {
    if (this.personIds && this.personIds.length > 0) {
      this.personService.trainMultiple(this.personIds).subscribe(
        (response) => {
          this.snackBar.open("Training is in progress.", "", {
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

  deleteRow() {
    this.personService.delete(this.deleteId).subscribe(
      (data) => {
        this.snackBar.open("Person Deleted Successfully.", "", {
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
