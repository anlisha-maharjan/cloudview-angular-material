import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { AlertService } from "app/services/alert.service";
import { MatSnackBar, MatDialog } from "@angular/material";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from "@angular/forms";
import { Helpers } from "app/helpers/helpers";
import { Person } from "app/models/person.model";
import { PersonService } from "app/services/person.service";
import { CatalogService } from "app/services/catalog.service";

@Component({
  selector: "cloudview-add-person",
  templateUrl: "./add-person.component.html",
  styleUrls: ["./add-person.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AddPersonComponent implements OnInit, AfterViewInit {
  @Input() id: number;
  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();
  person: Person;
  personImages: any;
  personForm: FormGroup;
  heading: any = "Add Person";
  catalogList: any;
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private alertService: AlertService,
    private personService: PersonService,
    private catalogService: CatalogService
  ) {}

  ngOnInit() {
    this.buildPersonForm();
    this.catalogService.getAll().subscribe(response => {
      this.catalogList = response.data;
    });
  }

  ngAfterViewInit() {
    // edit mode
    if (this.id != undefined) {
      this.personService.getById(this.id).subscribe(response => {
        this.person = response.data;
        this.buildPersonForm(this.person);
        this.heading = "Edit Person";
      });
      this.personService.getImages(this.id).subscribe(response => {
        this.personImages = response.data.images;
      });
    }
  }

  buildPersonForm(val: any = {}) {
    this.personForm = this.fb.group({
      id: [val.id],
      firstname: [val.firstname, [Validators.required]],
      middlename: [val.middlename],
      lastname: [val.lastname, [Validators.required]],
      gender: [val.gender, [Validators.required]],
      catalog_id: [val.catalog_id],
      description: [val.description]
    });
  }

  get firstname() {
    return this.personForm.get("firstname");
  }

  get middlename() {
    return this.personForm.get("middlename");
  }

  get lastname() {
    return this.personForm.get("lastname");
  }

  get gender() {
    return this.personForm.get("gender");
  }

  get catalog_id() {
    return this.personForm.get("catalog_id");
  }

  get description() {
    return this.personForm.get("description");
  }

  send(formDirective: FormGroupDirective) {
    this.personForm
      .get("description")
      .patchValue(`${this.personForm.get("description").value}`);
    const getFormValue = this.personForm.value;
    if (this.personForm.valid) {
      if (!getFormValue.id) {
        this.personService.create(getFormValue).subscribe(
          response => {
            this.dialog.closeAll();
            this.refresh.emit(true);
            this.snackBar.open("Person Saved Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center"
            });
            formDirective.resetForm();
            this.personForm.reset();
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
      } else {
        this.personService.update(getFormValue).subscribe(
          response => {
            this.dialog.closeAll();
            this.refresh.emit(true);
            this.snackBar.open("Person Updated Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center"
            });
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
  }
}
