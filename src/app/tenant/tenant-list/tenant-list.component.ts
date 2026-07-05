import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTenantDialogComponent } from '../add-tenant-dialog/add-tenant-dialog.component';
import { TenantService } from '../../services/tenant.service';
import { Tenant } from '../../models/tenant';
import { VacateTenantDialogComponent } from '../vacate-tenant-dialog/vacate-tenant-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [
  CommonModule,
  MatTableModule,
  MatDialogModule,
  MatButtonModule
],
  templateUrl: './tenant-list.component.html',
  styleUrl: './tenant-list.component.css'
})
export class TenantListComponent implements OnInit {

  private dialog = inject(MatDialog);

  private tenantService = inject(TenantService);

  tenants: Tenant[] = [];

  displayedColumns = [
  'name',
  'phone',
  'flat',
  'joining',
  'leaving',
  'deposit',
  'status',
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

  editTenant(row: Tenant): void {

  const dialogRef = this.dialog.open(
    AddTenantDialogComponent,
    {
      width: '550px',
      data: {
        mode: 'EDIT',
        tenant: row
      }
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if(result){

      this.loadTenants();

    }

  });

}

vacateTenant(row: Tenant): void {

  const dialogRef = this.dialog.open(
    VacateTenantDialogComponent,
    {
      width: '450px',
      data: row
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if(result){

      this.loadTenants();

    }

  });

}

}