import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterUsersService } from '../../../services/register-users.service';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, MatSnackBarModule],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.scss',
  providers: [RegisterUsersService, NotificationService]
})
export class RegisterStudentComponent {
  email: string = '';
  username: string = '';
  phone: string = '';
  errorMsg: string = '';
  toasterMsg: string = '';
  fullName: string = '';

  constructor(private userService: RegisterUsersService,
    private notificationService: NotificationService,
  private router: Router) {}


    
  showSuccessNotification() {
    this.notificationService.openSnackBar('Student registered successfully!', 'Close', 'success');
  }

  showErrorNotification(message: string) {
    this.notificationService.openSnackBar(message, 'Close', 'error');
  }

  registerStudent(){
    // validate email for correctness using regex and username for no spaces and length more than 3
    if(this.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) && this.username.length > 3 && !this.username.match(/\s/) && this.phone.length === 10){
      this.errorMsg = '';
      this.toasterMsg = 'Student successfully registered!';
      this.toasterMsg = '';
        this.userService.registerUser(this.username, 'student@123', this.fullName, this.email, this.phone, 'student').subscribe((res: any) => {
          console.log('admin reg success',res);
          this.showSuccessNotification();
          this.toasterMsg = 'Student successfully registered!'
          // redirect to dashboard
          this.router.navigate(['dashboard/inventory']);
        }, (error: any) => {
          console.log('ERRORORORORO', error);
          this.showErrorNotification('Student already exists');
        });
    }else{
      this.errorMsg = 'Make sure email, phone is correct and username has no spaces and is more than 3 characters long.';
    }

    
  }
}
