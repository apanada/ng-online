import { NavigationComponent } from './navigation/navigation.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';

export const router: Routes = [
  { path: 'login', component: LoginComponent },
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
