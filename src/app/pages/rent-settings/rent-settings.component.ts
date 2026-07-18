import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { RentService } from '../../services/rent.service';
import { CurrentRent } from '../../models/current-rent';
import { RentHistory } from '../../models/rent-history';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rent-settings',
  standalone: true,
  imports: [
  CommonModule,
  ReactiveFormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatSelectModule,
  MatSnackBarModule
],
  templateUrl: './rent-settings.component.html',
  styleUrls: ['./rent-settings.component.css']
})
export class RentSettingsComponent implements OnInit {

  currentRent?: CurrentRent;

  dataSource = new MatTableDataSource<RentHistory>();

  form!: FormGroup;

  displayedColumns = [
    'effectiveFrom',
    'rentAmount'
  ];

  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];

  years: number[] = [];

  constructor(
    private fb: FormBuilder,
    private rentService: RentService,
      private snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {

    const currentYear = new Date().getFullYear();

    for (let i = currentYear; i <= currentYear + 10; i++) {
      this.years.push(i);
    }

    this.form = this.fb.group({

      rentAmount: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      selectedMonth: [
        '',
        Validators.required
      ],

      selectedYear: [
        currentYear,
        Validators.required
      ]

    });

    this.loadData();

  }

  loadData(): void {

    this.rentService
      .getCurrentRent()
      .subscribe(data => {

        this.currentRent = data;

      });

    this.rentService
      .getHistory()
      .subscribe(data => {

        this.dataSource.data = data;

      });

  }

 save(): void {

  if (this.form.invalid) {

    this.form.markAllAsTouched();

    return;

  }

  const value = this.form.value;

  const request = {

    rentAmount: value.rentAmount,

    effectiveFrom:
      `${value.selectedYear}-${String(value.selectedMonth).padStart(2, '0')}-01`

  };

  console.log('Request:', request);

  this.rentService.changeRent(request).subscribe({
    next: (response: any) => {
      this.loadData();

      this.form.patchValue({
        selectedMonth: new Date().getMonth() + 1,
        selectedYear: new Date().getFullYear(),
      });

      this.snackBar.open(
        response.message,

        'Close',

        {
          duration: 3000,
        },
      );
    },

    error: (err) => {
      this.snackBar.open(
        err.error.message,

        'Close',

        {
          duration: 3000,
        },
      );
    },
  });

}

  formatMonthYear(date: string): string {

  const d = new Date(date);

  return d.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

}

}