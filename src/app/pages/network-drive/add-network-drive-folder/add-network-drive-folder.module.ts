
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "app/shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { NetworkDriveService } from "app/services/network-drive.service";
import { AddNetworkDriveFolderRoutingModule } from "./add-network-drive-folder-routing.module";
import { AddNetworkDriveFolderComponent } from "./add-network-drive-folder.component";
@NgModule({
  imports: [
    CommonModule,
    AddNetworkDriveFolderRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AlertService, NetworkDriveService],
  declarations: [AddNetworkDriveFolderComponent],
  exports: [AddNetworkDriveFolderComponent]
})
export class AddNetworkDriveFolderModule { }
