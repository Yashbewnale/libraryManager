import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthServiceService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  email:string = '';
  password: string = '';
  errorMsg: string = '';
  studentId: string = '';
  isAdmin: boolean = true;
  currentTab: string = 'admin';

  constructor(private router: Router, private authService: AuthServiceService, private cdr: ChangeDetectorRef){

  }

  ngOnInit(){
    localStorage.clear();
  }


  changeLogin(loginType: string){
    this.currentTab = loginType;
    if(loginType === 'admin'){
      this.isAdmin = true;
      this.studentId = '';
      this.password = '';
    }else{
      this.isAdmin = false;
      this.email = '';
      this.password = '';
    }
  }

  login(){
    // call backend
    if(this.email && this.password && this.isAdmin){
      this.errorMsg = '';
      this.authService.login(this.email, this.password, this.isAdmin).subscribe((res: any) => {
        console.log(res.token)
        if(res.token){
          localStorage.setItem('token', res.token);
          localStorage.setItem('isAdmin', res.isAdmin.toString());
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/dashboard/inventory']);
          this.cdr.detectChanges();
        }
      },
      (error: any) => {
        this.errorMsg = 'Bad credentials';
      }
    );
  }else if (this.studentId && this.password && !this.isAdmin){
    this.errorMsg = '';
    this.authService.login(this.studentId, this.password, this.isAdmin).subscribe((res: any) => {
      console.log(res.token)
      if(res.token){
        localStorage.setItem('userName',res.fullName);
        localStorage.setItem('token', res.token);
        localStorage.setItem('studentInfo', JSON.stringify(res));
        localStorage.setItem('isAdmin', res.isAdmin.toString());
        localStorage.setItem('isLoggedIn', 'true');
        this.cdr.detectChanges();

        this.router.navigate(['/dashboard/studentDashboard']);
      }
    },
    (error: any) => {
      this.errorMsg = 'Bad credentials';
    }
  );

  }
    
    else{
    this.errorMsg = 'Please enter correct credentials';
  }
  }
}
