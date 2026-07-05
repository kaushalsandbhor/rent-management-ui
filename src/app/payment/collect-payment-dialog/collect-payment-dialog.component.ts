import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { Dashboard } from '../../models/dashboard';

@Component({
  selector: 'app-collect-payment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './collect-payment-dialog.component.html',
  styleUrl: './collect-payment-dialog.component.css'
})
export class CollectPaymentDialogComponent {

  paidAmount!: number;

  paymentDate = new Date();

  paymentMode = 'UPI';

  remarks = '';

  paymentModes = [
    'UPI',
    'Cash',
    'Cheque'
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Dashboard,
    public dialogRef: MatDialogRef<CollectPaymentDialogComponent>
  ) {}

  save() {

    console.log({
      tenantId: this.data.tenantId,
      billingMonth: this.data.billingMonth,
      billingYear: this.data.billingYear,
      paidAmount: this.paidAmount,
      paymentDate: this.paymentDate,
      paymentMode: this.paymentMode,
      remarks: this.remarks
    });

    this.dialogRef.close(true);

  }

}
