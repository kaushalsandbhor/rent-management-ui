import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TenantService } from '../../services/tenant.service';
import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { FlatService } from '../../services/flat.service';
import { FlatDropdown } from '../../models/flat-dropdown';

@Component({
  selector: 'app-add-tenant-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-tenant-dialog.component.html',
  styleUrl: './add-tenant-dialog.component.css'
})
export class AddTenantDialogComponent {

  private tenantService = inject(TenantService);

  private flatService = inject(FlatService);

  dialogRef = inject(MatDialogRef<AddTenantDialogComponent>);

  name = '';

  phone = '';

  deposit = 10000;

  joiningDate: Date | null = null;

  flatId!: number;

  flats: FlatDropdown[] = [];

  loadVacantFlats() {

    const date =
      this.joiningDate?.toISOString().split('T')[0] || '';

    this.flatService
      .getVacantFlats(date)
      .subscribe(data => {

        this.flats = data;

      });

  }

  save(): void {

  const joiningDate =
      this.joiningDate?.toISOString().split('T')[0] || '';

  const request = {

    name: this.name,

    phone: this.phone,

    deposit: this.deposit,

    joiningDate: joiningDate,

    flatId: this.flatId

  };

  this.tenantService
      .createTenant(request)
      .subscribe({

        next: () => {

          this.dialogRef.close(true);

        },

        error: err => {

          console.error(err);

          alert("Unable to create tenant.");

        }

      });

}

}