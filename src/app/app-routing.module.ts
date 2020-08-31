import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./core/layout/layout.component";
import { AuthGuard } from "./guards";
import { TokenInterceptor } from "./interceptor/token.interceptor";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

const routes: Routes = [
  {
    path: "login",
    loadChildren: "app/pages/auth/login/login.module#LoginModule"
  },
  {
    path: "register",
    loadChildren: "app/pages/auth/register/register.module#RegisterModule"
  },
  {
    path: "forgot-password",
    loadChildren: "app/pages/auth/forgot-password/forgot-password.module#ForgotPasswordModule"
  },
  {
    path: "verify-email",
    loadChildren:
      "app/pages/auth/verify-email/verify-email.module#VerifyEmailModule"
  },
  {
    path: "reset-password",
    loadChildren:
      "app/pages/auth/reset-password/reset-password.module#ResetPasswordModule"
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "profile",
        loadChildren: "app/pages/auth/profile/profile.module#ProfileModule"
      },
      {
        path: "dashboard",
        loadChildren: "app/pages/dashboard/dashboard.module#DashboardModule",
        pathMatch: "full"
      },
      {
        path: "camera",
        loadChildren: "app/pages/camera/camera.module#CameraModule"
      },
      {
        path: "video",
        loadChildren: "app/pages/video/video.module#VideoModule"
      },
      {
        path: "network-drive",
        loadChildren: "app/pages/network-drive/network-drive.module#NetworkDriveModule"
      },
      {
        path: "person",
        loadChildren: "app/pages/person/person.module#PersonModule"
      },
      {
        path: "catalog",
        loadChildren: "app/pages/catalog/catalog.module#CatalogModule"
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
