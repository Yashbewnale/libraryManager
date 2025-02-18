import { Component } from '@angular/core';
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
  providers: [AuthServiceService]
})
export class LoginComponent {
  email:string = '';
  password: string = '';
  errorMsg: string = '';
  studentId: string = '';
  isAdmin: boolean = true;
  constructor(private router: Router, private authService: AuthServiceService){

  }

  ngOnInit(){
    localStorage.clear();
  }

  changeLogin(loginType: string){
    if(loginType === 'admin'){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }

  login(){
    // call backend
    if(this.email && this.password && this.isAdmin){
      this.errorMsg = '';
      this.authService.login(this.email, this.password, this.isAdmin).subscribe((res: { message: any, token: any; }) => {
        console.log(res.token)
        if(res.token){
          localStorage.setItem('token', res.token);
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/dashboard/inventory']);
        }
      },
      (error: any) => {
        this.errorMsg = 'Bad credentials';
      }
    );
  }else if (this.studentId && this.password && this.isAdmin){
    this.errorMsg = '';
    this.authService.login(this.studentId, this.password, this.isAdmin).subscribe((res: { message: any, token: any; }) => {
      console.log(res.token)
      if(res.token){
        localStorage.setItem('token', res.token);
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/dashboard/inventory']);
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
