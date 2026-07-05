import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';

import { Dashboard } from '../../models/dashboard';

@Component({
  selector: 'app-collect-payment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './collect-payment-dialog.component.html',
  styleUrl: './collect-payment-dialog.component.css'
})
export class CollectPaymentDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Dashboard
  ) {
  }

}