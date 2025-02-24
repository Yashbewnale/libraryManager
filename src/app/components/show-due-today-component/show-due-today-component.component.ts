import { Component } from '@angular/core';
import { ManageInventoryService } from '../../services/manage-inventory.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationService } from '../../services/notification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-due-today-component',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, DatePipe, MatTooltipModule],
  templateUrl: './show-due-today-component.component.html',
  styleUrl: './show-due-today-component.component.scss',
  providers: [ManageInventoryService]
})


export class ShowDueTodayComponentComponent {
  assignedBooks: any = [];
  searchText: string = '';
  today = new Date();

  constructor(private inventoryService: ManageInventoryService, private notificationService: NotificationService) {

  }

  ngOnInit(){
    this.getAssignedBooks();
  }

  formatDate(date: any){
    let pipe = new DatePipe('en-GB');
    return pipe.transform(date, 'dd/MM/yyyy') || '';
  }

    getAssignedBooks(){
      this.inventoryService.getAssignedBooks().subscribe((res: any) => {
        this.assignedBooks = res;
      }, (error: any) => {
        console.log('error', error);
      })
    }

    showSuccessNotification() {
      this.notificationService.openSnackBar('Book Returned successfully!', 'Close', 'success');
    }
  
    showErrorNotification(message: string) {
      this.notificationService.openSnackBar(message, 'Close', 'error');
    }

    returnBook(book: any){
      console.log('returning book', book);
      this.inventoryService.returnBook(book.bookId.isbn, book.studentId._id).subscribe((res: any) => {
        this.showSuccessNotification();
        this.getAssignedBooks();
      }, (error: any) => {
        this.showErrorNotification('Error returning book');
        console.log('error', error);
      }
      );
    }

    resetSearch(){
      this.searchText = '';
      this.getAssignedBooks();
    }
  
    searchBooks(){
      console.log('search', this.searchText);
      this.inventoryService.searchAssignedBook(this.searchText).subscribe((res: any) => {
        if(res['books'].length === 0){
          this.showErrorNotification('No books found');
          return;
        }
        this.assignedBooks = res.books;
      }, (error: any) => {
        console.log('error', error);
      })
    }
}
