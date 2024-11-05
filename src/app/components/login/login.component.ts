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
  constructor(private router: Router, private authService: AuthServiceService){

  }

  ngOnInit(){
    localStorage.clear();
  }

  login(){
    // call backend
    if(this.email && this.password){
      this.errorMsg = '';
      this.authService.login(this.email, this.password).subscribe((res: { message: any, token: any; }) => {
        console.log(res.token)
        if(res.token){
          localStorage.setItem('token', res.token);
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/dashboard/inventory']);
        }
      },
      (error: any) => {
        alert(error);
      }
    );
  }else{
    this.errorMsg = 'Please enter correct credentials';
  }
  }
}
