import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
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
  FormControl,
  FormGroupDirective,
} from "@angular/forms";
import { Helpers } from "app/helpers/helpers";
import { UnknownFaceService } from "app/services/unknown-face.service";
import { PersonService } from "app/services/person.service";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Subject } from "rxjs/Subject";
import { take, takeUntil } from "rxjs/operators";
interface Person {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
}
@Component({
  selector: "cloudview-associate-person",
  templateUrl: "./associate-person.component.html",
  styleUrls: ["./associate-person.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AssociatePersonComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() id: number;
  @Input() ids: any[];
  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();
  personForm: FormGroup;
  heading: any = "";
  private personList: Person[];
  public personCtrl: FormControl = new FormControl();
  public personFilterCtrl: FormControl = new FormControl();
  public filteredPersons: ReplaySubject<Person[]> = new ReplaySubject<Person[]>(
    1
  );
  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private alertService: AlertService,
    private unknownFaceService: UnknownFaceService,
    private personService: PersonService
  ) {}

  ngOnInit() {
    this.heading = this.title ? this.title : "Associate Person";
    this.buildPersonForm();
    this.personService.getAll().subscribe((response) => {
      this.personList = response.data;
      this.filteredPersons.next(this.personList.slice());
    });
    this.personFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterPersons();
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngAfterViewInit() {}

  buildPersonForm(val: any = {}) {
    this.personForm = this.fb.group({
      person_id: ["", [Validators.required]],
    });
  }

  get person_id() {
    return this.personForm.get("person_id");
  }

  private filterPersons() {
    if (!this.personList) {
      return;
    }
    // get the search keyword
    let search = this.personFilterCtrl.value;
    if (!search) {
      this.filteredPersons.next(this.personList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the person
    this.filteredPersons.next(
      this.personList.filter(
        (item) =>
          item.firstname.toLowerCase().indexOf(search) > -1 ||
          item.lastname.toLowerCase().indexOf(search) > -1
      )
    );
  }

  send(formDirective: FormGroupDirective) {
    const getFormValue = this.personForm.value;
    if (this.personForm.valid) {
      if (this.id) {
        this.unknownFaceService
          .associatePerson(this.id, getFormValue)
          .subscribe(
            (response) => {
              this.dialog.closeAll();
              this.refresh.emit(true);
              this.snackBar.open("Person Associated Successfully.", "", {
                duration: 2000,
                verticalPosition: "bottom",
                horizontalPosition: "center",
              });
              formDirective.resetForm();
              this.personForm.reset();
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
        getFormValue.face_ids = this.ids;
        this.unknownFaceService.associatePersonMultiple(getFormValue).subscribe(
          (response) => {
            this.dialog.closeAll();
            this.refresh.emit(true);
            this.snackBar.open("Person Associated Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
            });
            formDirective.resetForm();
            this.personForm.reset();
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
