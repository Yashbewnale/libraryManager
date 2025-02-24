import { Component } from '@angular/core';
import { AssignBookService } from '../../services/assign-book.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
  providers: [AssignBookService, NotificationService]
})
export class StudentDashboardComponent {
  studentInfo: any;
  assignedBooks: any;
  constructor(private assignBookService: AssignBookService, private notificationService: NotificationService){

  }

  ngOnInit(){
    const studentInfo = localStorage.getItem('studentInfo');
    this.studentInfo = studentInfo ? JSON.parse(studentInfo) : null;
    if(this.studentInfo){
      this.assignBookService.getUserAssignedBooks(this.studentInfo.username).subscribe((res: any) => {
        this.assignedBooks = res.res;
      }, (error: any) => {
        console.log('error', error);
        this.notificationService.openSnackBar('Error fetching assigned books', 'Close', 'error');
      });
    }

  }

    formatDate(date: any){
      let pipe = new DatePipe('en-GB');
      return pipe.transform(date, 'dd/MM/yyyy') || '';
    }

}
