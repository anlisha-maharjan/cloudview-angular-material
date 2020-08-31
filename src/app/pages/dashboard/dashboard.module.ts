import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AspectRatioModule } from '../../shared/aspect-ratio/aspect-ratio.module';
import { MaterialModule } from '../../shared/material-components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../../services/dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    // Core
    AspectRatioModule
  ],
  declarations: [DashboardComponent],
  providers: [DashboardService]
})
export class DashboardModule {
}
