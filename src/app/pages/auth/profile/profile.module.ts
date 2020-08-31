import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";

import { ListModule } from "app/shared/list/list.module";
import { AlertService } from "app/services/alert.service";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,

    ListModule
  ],
  providers: [AlertService],
  declarations: [ProfileComponent]
})
export class ProfileModule {}
