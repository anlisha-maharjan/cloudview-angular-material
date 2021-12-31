import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ListModule } from "app/shared/list/list.module";
import { AspectRatioModule } from '../../shared/aspect-ratio/aspect-ratio.module';
import { MaterialModule } from '../../shared/material-components.module';
import { DataService } from "app/services/table.data.service";
import { AlertService } from "app/services/alert.service";
import { CameraRoutingModule } from './camera-routing.module';
import { CameraComponent } from './camera.component';
import { CameraService } from '../../services/camera.service';
import { AddCameraModule } from './add-camera/add-camera.module';
import { ViewCameraModule } from './view-camera/view-camera.module';

@NgModule({
  imports: [
    CommonModule,
    CameraRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ListModule,
    AddCameraModule,
    ViewCameraModule,
    // Core
    AspectRatioModule
  ],
  declarations: [CameraComponent],
  providers: [CameraService, DataService, AlertService]
})
export class CameraModule {
}
