import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ListModule } from "app/shared/list/list.module";
import { AspectRatioModule } from "../../shared/aspect-ratio/aspect-ratio.module";
import { MaterialModule } from "../../shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { NetworkDriveRoutingModule } from "./network-drive-routing.module";
import { NetworkDriveComponent } from "./network-drive.component";
import { NetworkDriveService } from "../../services/network-drive.service";
import { AddNetworkDriveModule } from "./add-network-drive/add-network-drive.module";
import { AddNetworkDriveFolderModule } from "./add-network-drive-folder/add-network-drive-folder.module";
@NgModule({
  imports: [
    CommonModule,
    NetworkDriveRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ListModule,
    AddNetworkDriveModule,
    AddNetworkDriveFolderModule,
    AspectRatioModule,
  ],
  declarations: [NetworkDriveComponent],
  providers: [NetworkDriveService, AlertService],
})
export class NetworkDriveModule {}
