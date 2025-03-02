import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-book-info',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss'
})
export class BookInfoComponent {
  bookForInfo: any = '';
  for: any = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<BookInfoComponent>
  ) {
    this.for = data.for;
    this.bookForInfo = data.book;
  }

  close() {
    this.dialogRef.close();
  }
}
