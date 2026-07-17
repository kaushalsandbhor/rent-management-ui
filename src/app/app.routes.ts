import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RentSettingsComponent } from './pages/rent-settings/rent-settings.component';
import { TenantListComponent } from './tenant/tenant-list/tenant-list.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'tenants',
    component: TenantListComponent
  },

  {
    path: 'rent-settings',
    component: RentSettingsComponent
  }

];