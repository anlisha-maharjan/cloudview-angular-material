import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { cloudviewCardModule } from '../../../shared/card/card.module';
import { ClickOutsideModule } from '../../../shared/click-outside/click-outside.module';
import { MaterialModule } from '../../../shared/material-components.module';
import { ScrollbarModule } from '../../../shared/scrollbar/scrollbar.module';
import { ToolbarFullscreenToggleComponent } from './toolbar-fullscreen-toggle/toolbar-fullscreen-toggle.component';
import { ToolbarNotificationsComponent } from './toolbar-notifications/toolbar-notifications.component';
import { ToolbarQuickpanelToggleComponent } from './toolbar-quickpanel-toggle/toolbar-quickpanel-toggle.component';
import { ToolbarSearchBarComponent } from './toolbar-search-bar/toolbar-search-bar.component';
import { ToolbarSearchComponent } from './toolbar-search/toolbar-search.component';
import { ToolbarSidenavMobileToggleComponent } from './toolbar-sidenav-mobile-toggle/toolbar-sidenav-mobile-toggle.component';
import { ToolbarUserButtonComponent } from './toolbar-user-button/toolbar-user-button.component';
import { ToolbarComponent } from './toolbar.component';
import { AuthenticationService } from 'app/services/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ScrollbarModule,
    FormsModule,
    ClickOutsideModule,
    cloudviewCardModule
  ],
  declarations: [
    ToolbarComponent,
    ToolbarUserButtonComponent,
    ToolbarNotificationsComponent,
    ToolbarSearchComponent,
    ToolbarSearchBarComponent,
    ToolbarQuickpanelToggleComponent,
    ToolbarFullscreenToggleComponent,
    ToolbarSidenavMobileToggleComponent
  ],
  exports: [ToolbarComponent],
  providers: [AuthenticationService]
})
export class ToolbarModule {
}
