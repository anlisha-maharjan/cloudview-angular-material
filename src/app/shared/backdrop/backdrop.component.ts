import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidenavState } from '../../core/layout/sidenav/sidenav-state.enum';
import { SidenavService } from '../../core/layout/sidenav/sidenav.service';

@Component({
  selector: 'cloudview-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent implements OnInit {

  isMobileOpen$: Observable<boolean>;

  constructor(private sidenavService: SidenavService) {
  }

  ngOnInit() {
    this.isMobileOpen$ = this.sidenavService.sidenavState$.pipe(
      map(state => state === SidenavState.MobileOpen)
    );
  }

  closeSidenavMobile() {
    this.sidenavService.sidenavState = SidenavState.Mobile;
  }
}
