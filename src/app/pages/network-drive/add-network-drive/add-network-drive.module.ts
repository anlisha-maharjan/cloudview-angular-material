
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { NetworkDriveService } from "app/services/network-drive.service";
import { AddNetworkDriveRoutingModule } from "./add-network-drive-routing.module";
import { AddNetworkDriveComponent } from "./add-network-drive.component";
@NgModule({
  imports: [
    CommonModule,
    AddNetworkDriveRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AlertService, NetworkDriveService],
  declarations: [AddNetworkDriveComponent],
  exports: [AddNetworkDriveComponent]
})
export class AddNetworkDriveModule { }
