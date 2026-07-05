import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { TenantService } from '../../services/tenant.service';
import { Tenant } from '../../models/tenant';

@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './tenant-list.component.html',
  styleUrl: './tenant-list.component.css'
})
export class TenantListComponent implements OnInit {

  private tenantService = inject(TenantService);

  tenants: Tenant[] = [];

  displayedColumns = [
    'name',
    'phone',
    'flat',
    'joining',
    'deposit',
    'action'
  ];

  ngOnInit(): void {

    this.loadTenants();

  }

  loadTenants() {

    this.tenantService
      .getAllTenants()
      .subscribe(data => {

        this.tenants = data;

      });

  }

}