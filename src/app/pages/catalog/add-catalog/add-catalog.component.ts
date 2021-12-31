import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { AlertService } from "app/services/alert.service";
import { MatSnackBar, MatDialog } from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import { Helpers } from "app/helpers/helpers";
import { Catalog } from "app/models/catalog.model";
import { CatalogService } from "app/services/catalog.service";

@Component({
  selector: "cloudview-add-catalog",
  templateUrl: "./add-catalog.component.html",
  styleUrls: ["./add-catalog.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddCatalogComponent implements OnInit, AfterViewInit {
  @Input() id: number;
  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();
  catalog: Catalog;
  catalogForm: FormGroup;
  heading: any = "Add Catalog";

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private alertService: AlertService,
    private catalogService: CatalogService
  ) {}

  ngOnInit() {
    this.buildCatalogForm();
  }

  ngAfterViewInit() {
    // edit mode
    if (this.id != undefined) {
      this.catalogService.getById(this.id).subscribe(
        (response) => {
          this.catalog = response.data;
          this.buildCatalogForm(this.catalog);
          this.heading = "Edit Catalog";
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

  buildCatalogForm(val: any = {}) {
    this.catalogForm = this.fb.group({
      id: [val.id],
      name: [val.name, [Validators.required]],
      description: [val.description],
    });
  }

  get name() {
    return this.catalogForm.get("name");
  }

  get description() {
    return this.catalogForm.get("description");
  }

  send(formDirective: FormGroupDirective) {
    // this.catalogForm.get('description').patchValue(`${this.catalogForm.get('description').value}`);
    const getFormValue = this.catalogForm.value;
    if (this.catalogForm.valid) {
      if (!getFormValue.id) {
        this.catalogService.create(getFormValue).subscribe(
          (response) => {
            this.dialog.closeAll();
            this.refresh.emit(true);
            this.snackBar.open("Catalog Saved Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
            });
            formDirective.resetForm();
            this.catalogForm.reset();
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
        this.catalogService.update(getFormValue).subscribe(
          (response) => {
            this.dialog.closeAll();
            this.refresh.emit(true);
            this.snackBar.open("Catalog Updated Successfully.", "", {
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
  }
}
