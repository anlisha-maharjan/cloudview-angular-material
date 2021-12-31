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
import { User } from "app/models/user.model";
import { UserService } from "app/services/user.service";

@Component({
  selector: "cloudview-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddUserComponent implements OnInit, AfterViewInit {
  @Input() id: number;
  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();
  user: User;
  userForm: FormGroup;
  heading: any = "Add User";
  editForm: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.buildUserForm();
  }

  ngAfterViewInit() {
    // edit mode
    if (this.id != undefined) {
      this.editForm = true;
      this.userService.getById(this.id).subscribe(
        (response) => {
          this.user = response.data;
          this.buildUserForm(this.user);
          this.heading = "Edit User";
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

  buildUserForm(val: any = {}) {
    this.userForm = this.fb.group({
      id: [val.id],
      name: [val.name, [Validators.required]],
      email: [
        { value: val.email, disabled: this.editForm },
        [Validators.required, Validators.email],
      ],
    });
  }

  get name() {
    return this.userForm.get("name");
  }

  get email() {
    return this.userForm.get("email");
  }

  send(formDirective: FormGroupDirective) {
    const getFormValue = this.userForm.value;
    if (this.userForm.valid) {
      if (!getFormValue.id) {
        this.userService.create(getFormValue).subscribe(
          (response) => {
            this.dialog.closeAll();
            this.refresh.emit(true);
            this.snackBar.open("User Saved Successfully.", "", {
              duration: 2000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
            });
            formDirective.resetForm();
            this.userForm.reset();
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
        this.userService.update(getFormValue).subscribe(
          (response) => {
            this.dialog.closeAll();
            this.refresh.emit(true);
            this.snackBar.open("User Updated Successfully.", "", {
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
