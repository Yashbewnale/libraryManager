import { Component } from '@angular/core';
import { StudentDataService } from '../../services/student-data.service';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from '../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-students',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, ConfirmationDialogComponent, FormsModule,ReactiveFormsModule],
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.scss',
  providers: [StudentDataService]
})
export class AllStudentsComponent {
  students: any;
  searchText: string = '';

  constructor(private studentService: StudentDataService, private notificationService: NotificationService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents(){
    this.studentService.getAllStudents().subscribe((data: any) => {
      console.log(data);
      this.students = data;
    }
  );
  }

  resetSearch(){
    this.searchText = '';
    this.getAllStudents();
  }

  searchStudents(){
    this.studentService.searchStudents(this.searchText).subscribe((data: any) => {
      console.log(data);
      this.students = data.students;
    }, (error: any) => {
      console.log('error', error);
      this.notificationService.openSnackBar('Student not found.', 'Close', 'error');
    });
  }

  deleteStudent(student: any){

    this.openConfirmationDialog(student)
  }

    openConfirmationDialog(student: any) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          data: {
            message: 'Are you sure you want to delete this student?',
            buttonText: {
              ok: 'Yes',
              cancel: 'No'
            },
            for: 'deleteBook'
          }
        });
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed) {
            this.studentService.deleteStudent(student._id).subscribe((res: any) => {
              this.notificationService.openSnackBar('Student Deleted successfully!', 'Close', 'success');
              this.getAllStudents();
            }, (error: any) => {
              console.log('error', error);
              this.notificationService.openSnackBar('Error or Student not found.', 'Close', 'error');
            })
          }else{
    
          }
        });
      }

}
