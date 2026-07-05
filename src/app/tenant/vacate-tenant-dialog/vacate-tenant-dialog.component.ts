import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { inject } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { Tenant } from '../../models/tenant';

@Component({
  selector: 'app-vacate-tenant-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './vacate-tenant-dialog.component.html',
  styleUrl: './vacate-tenant-dialog.component.css'
})
export class VacateTenantDialogComponent {

  leavingDate = new Date();

  private tenantService = inject(TenantService);

  constructor(

    @Inject(MAT_DIALOG_DATA)

    public tenant: Tenant,

    public dialogRef: MatDialogRef<VacateTenantDialogComponent>

  ) {}

  vacate(): void {

  const request = {

    leavingDate:
      this.leavingDate.toISOString().split('T')[0]

  };

  this.tenantService
      .vacateTenant(
          this.tenant.id,
          request
      )
      .subscribe({

        next: () => {

          this.dialogRef.close(true);

        },

        error: err => {

          console.error(err);

          alert("Unable to vacate tenant.");

        }

      });

}

}