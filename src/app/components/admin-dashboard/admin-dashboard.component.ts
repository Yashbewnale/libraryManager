import { Component } from '@angular/core';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { BookInventoryComponent } from './book-inventory/book-inventory.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AddAdminComponent, BookInventoryComponent, RegisterStudentComponent, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  // selectedChoice = 'inventory'; //addAdmin, regStudent


}
