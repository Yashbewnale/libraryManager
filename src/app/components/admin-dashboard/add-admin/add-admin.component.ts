import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterUsersService } from '../../../services/register-users.service';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, MatSnackBarModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.scss',
  providers: [RegisterUsersService, NotificationService]
})
export class AddAdminComponent {
  private _snackBar = inject(MatSnackBar);
  durationInSeconds = 5;

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMsg: string = '';
  toasterMsg: string = ''
  showToaster: boolean = false;

  constructor(
    private userService: RegisterUsersService,
    private notificationService: NotificationService
  ){}

  showSuccessNotification() {
    this.notificationService.openSnackBar('Admin registered successfully!', 'Close', 'success');
  }

  showErrorNotification(message: string) {
    this.notificationService.openSnackBar(message, 'Close', 'error');
  }


  register(){
    if(this.password === this.confirmPassword){
      this.errorMsg = '';
      this.toasterMsg = '';
      this.userService.registerAdmin(this.username, this.password).subscribe((res: any) => {
        console.log('admin reg success',res);
        this.showSuccessNotification();
        this.toasterMsg = 'Admin successfully registered!'
      }, (error: any) => {
        console.log('ERRORORORORO', error);
        this.showErrorNotification('User already exists');
      });
    }else{
      this.errorMsg = 'Passwords do not match.'
    }
  }
}
