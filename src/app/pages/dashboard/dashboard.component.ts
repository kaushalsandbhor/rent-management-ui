import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../models/dashboard';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
  CommonModule,
  MatTableModule,
  FormsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatCardModule
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  private dashboardService = inject(DashboardService);

  dashboard: Dashboard[] = [];

  loading = false;

  displayedColumns = [
  'flat',
  'tenant',
  'rent',
  'paid',
  'balance',
  'action'
];

totalFlats = 0;

occupiedFlats = 0;

vacantFlats = 0;

expectedRent = 0;

collectedRent = 0;

  month = new Date().getMonth() + 1;

year = new Date().getFullYear();

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

years = [
  2024,
  2025,
  2026,
  2027,
  2028
];

  ngOnInit(): void {

    this.loadDashboard();

  }

  reloadDashboard() {

  this.loadDashboard();

}

calculateSummary(): void {

  this.totalFlats = this.dashboard.length;

  this.occupiedFlats =
    this.dashboard.filter(x => x.tenantId != null).length;

  this.vacantFlats =
    this.totalFlats - this.occupiedFlats;

  this.expectedRent =
    this.dashboard.reduce(
      (sum, x) => sum + (x.rent ?? 0),
      0
    );

  this.collectedRent =
    this.dashboard.reduce(
      (sum, x) => sum + (x.paid ?? 0),
      0
    );

}

loadDashboard(): void {

  this.loading = true;

  this.dashboardService
      .getDashboard(this.month, this.year)
      .subscribe({

        next: data => {

  console.log("Dashboard Response", data);

  this.dashboard = data;

  console.log("Dashboard Variable", this.dashboard);

  this.calculateSummary();

  this.loading = false;

},

        error: () => {

          this.loading = false;

        }

      });

}

}