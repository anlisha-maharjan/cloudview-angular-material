import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  FormGroupDirective,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "app/services/user.service";
import { AngularTokenService } from "angular-token";
@Component({
  selector: "cloudview-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit, AfterViewInit {
  user: any;
  heading: any = "Profile";
  profileForm: FormGroup;
  passwordForm: FormGroup;
  disableInput = true;
  editmode = false;
  activeForm = "profile";
  attachment: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private tokenService: AngularTokenService
  ) {}

  ngOnInit() {
    this.user = this.tokenService.currentUserData;
    this.profileForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      fullname: [this.user.name ? this.user.name : "", [Validators.required]],
      phone: [""],
      address: [""],
    });
    this.passwordForm = this.fb.group({
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
    });
  }

  get email() {
    return this.profileForm.get("email");
  }

  get fullname() {
    return this.profileForm.get("fullname");
  }

  get phone() {
    return this.profileForm.get("phone");
  }

  get address() {
    return this.profileForm.get("address");
  }

  get password() {
    return this.passwordForm.get("password");
  }

  get confirmPassword() {
    return this.passwordForm.get("confirmPassword");
  }

  ngAfterViewInit() {
    this.profileForm.disable();
    this.passwordForm.disable();
  }

  handleFileInput(files: FileList) {
    const reader = new FileReader();
    const file = files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.attachment = {
        file: file,
        fileName: file.name,
        value: "data:" + file.type + ";base64," + reader.result.split(",")[1],
      };
    };
  }

  disableForm(disable) {
    this.editmode = !disable;
    if (disable) {
      if (this.activeForm == "profile") {
        this.profileForm.disable();
      } else {
        this.passwordForm.disable();
      }
    } else {
      if (this.activeForm == "profile") {
        this.profileForm.enable();
      } else {
        this.passwordForm.enable();
      }
    }
  }

  changeActiveForm(form) {
    this.activeForm = form;
  }

  removePhoto() {
    this.attachment = {};
  }

  onUpdateProfile() {
    const getFormValue = this.profileForm.value;
    if (this.profileForm.valid) {
      getFormValue.userPhoto = this.attachment;
    }
  }

  onChangePassword() {
    const getFormValue = this.passwordForm.value;
    if (this.passwordForm.valid) {
    }
  }
}
