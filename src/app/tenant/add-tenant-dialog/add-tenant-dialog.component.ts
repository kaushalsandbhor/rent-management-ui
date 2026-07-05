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
import { OnInit } from '@angular/core';
import { FlatService } from '../../services/flat.service';
import { FlatDropdown } from '../../models/flat-dropdown';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

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
export class AddTenantDialogComponent implements OnInit {

  private tenantService = inject(TenantService);

  private flatService = inject(FlatService);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogRef: MatDialogRef<AddTenantDialogComponent>
) {}

  name = '';

  phone = '';

  deposit = 10000;

  joiningDate: Date | null = null;

  flatId!: number;

  leavingDate: Date | null = null;

  flats: FlatDropdown[] = [];

  ngOnInit(): void {

  if (this.data?.mode === 'EDIT') {

    const tenant = this.data.tenant;

    this.name = tenant.name;
    this.phone = tenant.phone;
    this.deposit = tenant.deposit;
    this.flatId = tenant.flatId;
    this.joiningDate = new Date(tenant.joiningDate);
    if (tenant.leavingDate) {
    this.leavingDate = new Date(tenant.leavingDate);
}

    this.loadVacantFlats();

  }

}

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

  if (this.data?.mode === 'EDIT') {

    this.tenantService
        .updateTenant(this.data.tenant.id, request)
        .subscribe({

            next: () => {

                this.dialogRef.close(true);

            }

        });

} else {

    this.tenantService
        .createTenant(request)
        .subscribe({

            next: () => {

                this.dialogRef.close(true);

            }

        });

}

}

}