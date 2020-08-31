import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild
} from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormGroupDirective } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "app/services/user.service";
import { AngularTokenService } from "angular-token";
@Component({
  selector: "cloudview-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit, AfterViewInit {
  user: any;
  heading: any = "Profile";
  profileForm: FormGroup;
  disableInput = true;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private tokenService: AngularTokenService
  ) { }

  ngOnInit() {
    this.user = this.tokenService.currentUserData;
    this.profileForm = this.fb.group({
      email: [{ value: this.user.email, disabled: this.disableInput }, [Validators.required, Validators.email]],
      fullName: [{ value: this.user.name ? this.user.name : 'John Doe', disabled: this.disableInput }, [Validators.required]],
    });
  }

  ngAfterViewInit() {

  }
}
