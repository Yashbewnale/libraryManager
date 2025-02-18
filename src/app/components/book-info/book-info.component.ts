import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-book-info',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss'
})
export class BookInfoComponent {
  bookForInfo: any = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<BookInfoComponent>
  ) {
    console.log('book received', data);
    this.bookForInfo = data.book;
  }

  close() {
    this.dialogRef.close();
  }
}
