import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [AuthServiceService]
})
export class HeaderComponent {
  isLoggedIn!: string | null;
  constructor(private router: Router, public authService: AuthServiceService, private dialog: MatDialog) { }

  logout() {
    this.authService.logout();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to logout?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });


    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.logout();
      }else{

      }
    });
  }
}
