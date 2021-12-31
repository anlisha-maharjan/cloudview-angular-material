import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ListModule } from "app/shared/list/list.module";
import { AspectRatioModule } from "../../shared/aspect-ratio/aspect-ratio.module";
import { MaterialModule } from "../../shared/material-components.module";
import { DataService } from "app/services/table.data.service";
import { AlertService } from "app/services/alert.service";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { UserService } from "../../services/user.service";
import { AddUserModule } from "./add-user/add-user.module";

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ListModule,
    AddUserModule,
    // Core
    AspectRatioModule
  ],
  declarations: [UserComponent],
  providers: [UserService, DataService, AlertService]
})
export class UserModule {}
