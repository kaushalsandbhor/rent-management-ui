import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { Dashboard } from '../../models/dashboard';
import { inject } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

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
    MatButtonModule,
  ],
  templateUrl: './collect-payment-dialog.component.html',
  styleUrl: './collect-payment-dialog.component.css',
})
export class CollectPaymentDialogComponent {
  private paymentService = inject(PaymentService);

  paidAmount!: number;

  paymentDate = new Date();

  remarks = '';

  paymentModes = [
  { value: 'UPI', label: 'UPI' },
  { value: 'CASH', label: 'Cash' },
  { value: 'CHEQUE', label: 'Cheque' }
];

paymentMode = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Dashboard,
    public dialogRef: MatDialogRef<CollectPaymentDialogComponent>,
  ) {}

  save(): void {
    const formattedDate = this.paymentDate.toISOString().split('T')[0];

    const request = {
      tenantId: this.data.tenantId,

      billingMonth: this.data.billingMonth,

      billingYear: this.data.billingYear,

      paidAmount: this.paidAmount,

      paymentDate: formattedDate,

      paymentMode: this.paymentMode,

      remarks: this.remarks,
    };

    this.paymentService.collectPayment(request).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },

      error: (err) => {
        console.error(err);

        alert('Unable to save payment.');
      },
    });
  }
}
