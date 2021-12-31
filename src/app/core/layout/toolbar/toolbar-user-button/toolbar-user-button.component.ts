import { UserService } from 'app/services/user.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/services/authentication.service";
import { AngularTokenService } from 'angular-token';

@Component({
  selector: "cloudview-toolbar-user-button",
  templateUrl: "./toolbar-user-button.component.html",
  styleUrls: ["./toolbar-user-button.component.scss"]
})
export class ToolbarUserButtonComponent implements OnInit {
  user: any;
  isOpen: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService,
    private tokenService: AngularTokenService
  ) { }

  ngOnInit() {
    this.user = this.tokenService.currentUserData;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  deleteAccount(){
    this.authService.deleteAccount().subscribe(
      response => {
        this.router.navigate(["/login"]);
      },
      error => {
        console.log(error);
      }
    );
  }

  logout() {
    localStorage.removeItem("companyName");
    this.authService.logout().subscribe(
      response => {
        this.router.navigate(["/login"]);
      },
      error => {
        console.log(error);
      }
    );
  }
}
