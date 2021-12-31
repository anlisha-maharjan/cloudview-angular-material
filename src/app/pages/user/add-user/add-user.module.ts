import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { UserService } from "app/services/user.service";
import { AddUserRoutingModule } from "./add-user-routing.module";
import { AddUserComponent } from "./add-user.component";
@NgModule({
  imports: [
    CommonModule,
    AddUserRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AlertService, UserService],
  declarations: [AddUserComponent],
  exports: [AddUserComponent],
})
export class AddUserModule {}
