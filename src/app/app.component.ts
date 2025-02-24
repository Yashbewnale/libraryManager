import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AuthServiceService } from './services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthServiceService]
})
export class AppComponent {
  constructor(private authService: AuthServiceService) {}
  title = 'bookManager';
  isAdmin!: boolean;
  ngOnInit() {
}
}
