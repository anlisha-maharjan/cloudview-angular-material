import { Injectable, ComponentFactoryResolver } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";
import { MatDialog } from "@angular/material";
import { ErrorAlertComponent } from "app/shared/alert/error-alert/error-alert.components";
import { AlertDialogComponent } from "app/shared/alert/alert-dialog/alert-dialog.components";
import {AlertInfoComponent} from "app/shared/alert/alert-info/alert-info.components";
@Injectable()
export class AlertService {
  static ValidationService: any;

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;
  private pop: string;
  componentRef;

  constructor(
    private router: Router,
    private cfr: ComponentFactoryResolver,
    private dialog: MatDialog
  ) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }
  showMessage(
    title: string,
    message: any,
    pop: string = "dialog",
    container: any,
    width = 320
  ) {
    const validationOption = (this.pop = pop);
    if (validationOption === "dialog") {
      this.dialog.open(AlertDialogComponent, {
        data: { message: message, title: title },
        width: width + "px",
        panelClass: "default-alert-pop"
      });
    } else {
      container.clear();
      const factory = this.cfr.resolveComponentFactory(ErrorAlertComponent);
      this.componentRef = container.createComponent(factory);
      this.componentRef.instance.message = message;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  showInfoMessage(
    title: string,
    message: any,
    pop: string = "dialog",
    container: any,
    width = 320
  ) {
    const validationOption = (this.pop = pop);
    if (validationOption === "dialog") {
      this.dialog.open(AlertInfoComponent, {
        data: { message: message, title: title },
        width: width + "px",
        panelClass: "default-alert-pop"
      });
    } else {
      container.clear();
      const factory = this.cfr.resolveComponentFactory(ErrorAlertComponent);
      this.componentRef = container.createComponent(factory);
      this.componentRef.instance.message = message;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: "success", text: message });
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: "danger", text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
