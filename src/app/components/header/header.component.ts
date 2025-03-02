import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, MatDialogModule, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [AuthServiceService],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  isAdmin!: boolean;
  userName: any;

  ngOnInit() { }

  isLoggedIn!: string | null;
  constructor(private router: Router, private cdr: ChangeDetectorRef, public authService: AuthServiceService, private dialog: MatDialog) { }

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
        },
        for: 'logout'
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
