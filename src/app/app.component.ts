import { Component } from "@angular/core";
import { SidenavItem } from "./core/layout/sidenav/sidenav-item/sidenav-item.interface";
import { SidenavService } from "./core/layout/sidenav/sidenav.service";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "cloudview-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  menu: SidenavItem[] = [];

  constructor(
    private sidenavService: SidenavService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    // converting svg to maticon
    // Menu Icons
    iconRegistry.addSvgIcon(
      "icon-add",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-add.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-alert",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-alert.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-audio",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-audio.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-camera",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-camera.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-catalog",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-catalog.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-correct",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-correct.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-cross",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-cross.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-dashboard",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-dashboard.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-download",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-download.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-export",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-export.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-files",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-files.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-image-upload",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-image-upload.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-known-faces",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-known-faces.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-menu",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-menu.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-menu-open",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-menu-open.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-network",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-network.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-rules",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-rules.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-search",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-search.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-setting",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-setting.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-trash",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-trash.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-unknown",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-unknown.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-unknown-faces",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-unknown-faces.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-upload",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-upload.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-user",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-user.svg")
    );
    iconRegistry.addSvgIcon(
      "icon-video",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/icon-video.svg")
    );

    this.menu.push({
      name: "Dashboard",
      routeOrFunction: "/",
      icon: "icon-dashboard",
      position: 10,
      pathMatchExact: true,
      separator: true
    });
    this.menu.push({
      name: "Search",
      icon: "icon-search",
      routeOrFunction: '/',
      position: 15,
      pathMatchExact: true
    });
    this.menu.push({
      name: "Alerts",
      icon: "icon-alert",
      routeOrFunction: '/',
      position: 15,
      pathMatchExact: true
    });
    this.menu.push({
      name: "Rules",
      routeOrFunction: "/",
      icon: "icon-rules",
      position: 15,
      pathMatchExact: true,
      separator: true
    });

    this.menu.push({
      name: "Catalog",
      icon: "icon-catalog",
      routeOrFunction: '/catalog',
      position: 15,
      pathMatchExact: true
    });
    this.menu.push({
      name: "Known Faces",
      icon: "icon-user",
      routeOrFunction: '/person',
      position: 15,
      pathMatchExact: true
    });
    this.menu.push({
      name: "Unknown Faces",
      icon: "icon-unknown",
      routeOrFunction: '/',
      position: 15,
      pathMatchExact: true,
      separator: true
    });
    this.menu.push({
      name: "Video",
      icon: "icon-video",
      routeOrFunction: '/video',
      position: 15,
      pathMatchExact: true
    });
    this.menu.push({
      name: "Camera",
      icon: "icon-camera",
      routeOrFunction: '/camera',
      position: 15,
      pathMatchExact: true
    });
    this.menu.push({
      name: "Network Drive",
      icon: "icon-network",
      routeOrFunction: '/network-drive',
      position: 15,
      pathMatchExact: true,
      separator: true
    });
    this.menu.push({
      name: "Setting",
      routeOrFunction: "/",
      icon: "icon-setting",
      position: 15,
      pathMatchExact: true
    });
    this.menu.forEach(item => this.sidenavService.addItem(item));
  }

  ngOnInit() {
  }
}
