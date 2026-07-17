import { Component } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './layout/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DashboardComponent,
    RouterOutlet,
    NavigationComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
}