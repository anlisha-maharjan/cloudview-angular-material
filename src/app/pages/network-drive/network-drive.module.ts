import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ListModule } from "app/shared/list/list.module";
import { AspectRatioModule } from '../../shared/aspect-ratio/aspect-ratio.module';
import { MaterialModule } from '../../shared/material-components.module';
import { DataService } from "app/services/table.data.service";
import { AlertService } from "app/services/alert.service";
import { NetworkDriveRoutingModule } from './network-drive-routing.module';
import { NetworkDriveComponent } from './network-drive.component';
import { NetworkDriveService } from '../../services/network-drive.service';
import { AddNetworkDriveModule } from './add-network-drive/add-network-drive.module';

@NgModule({
  imports: [
    CommonModule,
    NetworkDriveRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ListModule,
    AddNetworkDriveModule,
    // Core
    AspectRatioModule
  ],
  declarations: [NetworkDriveComponent],
  providers: [NetworkDriveService, DataService, AlertService]
})
export class NetworkDriveModule {
}
