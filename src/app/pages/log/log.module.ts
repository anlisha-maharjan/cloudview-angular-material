import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ListModule } from "app/shared/list/list.module";
import { AspectRatioModule } from "../../shared/aspect-ratio/aspect-ratio.module";
import { MaterialModule } from "../../shared/material-components.module";
import { AlertService } from "app/services/alert.service";
import { LogRoutingModule } from "./log-routing.module";
import { LogComponent } from "./log.component";
import { LogService } from "../../services/log.service";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
@NgModule({
  imports: [
    CommonModule,
    LogRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ListModule,
    AspectRatioModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [LogComponent],
  providers: [LogService, AlertService],
})
export class LogModule {}
