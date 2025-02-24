import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ManageInventoryService } from '../../../services/manage-inventory.service';
import { HttpClientModule } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AssignBookModalComponent } from '../../assign-book-modal/assign-book-modal.component';
import { AssignBookService } from '../../../services/assign-book.service';
import { NotificationService } from '../../../services/notification.service';
import { BookInfoComponent } from '../../book-info/book-info.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-book-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, HttpClientModule, CommonModule, AssignBookModalComponent, MatTooltipModule, BookInfoComponent,ConfirmationDialogComponent],
  templateUrl: './book-inventory.component.html',
  styleUrl: './book-inventory.component.scss',
  providers: [ManageInventoryService, AssignBookService, NotificationService]
})
export class BookInventoryComponent  implements AfterViewInit {
  bookList: any = [];
  ELEMENT_DATA: BookData[] = [];
  enableUpload: boolean = false;
  fileError: string = '';
  dataFromDialog: any;
  searchText: string = '';


  constructor(
    private inventoryService: ManageInventoryService,
    private dialog: MatDialog,
    private assignBookService: AssignBookService,
    private notificationService: NotificationService
  ){}

  ngOnInit(){
    this.getBooks(1, this.pageSize);
  }



  selectedFile: File | null = null;

  displayedColumns: string[] = ['ISBN','Book Name', 'Author', 'Available Quantity', 'Action'];
  dataSource = new MatTableDataSource<BookData>(this.bookList);
  pageSize = 10;
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // Set the paginator's range label once here
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = Math.min((page + 1) * pageSize, length);
      return `${start} - ${end} of ${length}`;
    };

    // Subscribe to paginator page event
    this.paginator.page.subscribe(() => {
      this.getBooks(this.paginator.pageIndex + 1, this.paginator.pageSize);
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase(); // Get the file extension
  
      // Check if the file is an Excel file (xlsx or xls)
      if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        this.selectedFile = file;
        this.enableUpload = true; // Enable upload button
        this.fileError = ''; // Clear any previous error message
      } else {
        this.fileError = 'Please upload a valid Excel file (xlsx or xls).'; // Set error message
        this.selectedFile = null; // Clear selected file
        this.enableUpload = false; // Disable upload button
      }
    }
  }
  

  uploadBooks() {
    if (!this.selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.inventoryService.uploadBooks(formData).subscribe(res => {
      console.log(res);
      setTimeout(()=>{
        this.getBooks(1, this.pageSize);
      }, 1000)
    }, error => {
      console.log('error',error)
    })
  }

  getBooks(page: any, size: any){
    this.inventoryService.getBooks(page, size).subscribe((res: any) => {
      this.bookList = res['books'];
      this.totalItems = res['totalItems'];
      // this.dataSource = new MatTableDataSource<BookData>(this.bookList);
      this.dataSource.data = this.bookList;
      // this.dataSource.paginator = this.paginator;
      this.paginator.length = this.totalItems;

      this.paginator.pageIndex = page - 1; // Adjust for 0-based index
      this.paginator.pageSize = size;
      console.log('books', res);
    }, error => {
      console.log('error', error)
    })
  }

  onPageChange(event: PageEvent){
    console.log("Page Index:", event.pageIndex);
    console.log("Page Size:", event.pageSize);
    console.log("Length:", event.length);
    this.getBooks(event.pageIndex + 1, event.pageSize);
  }


  showSuccessNotification() {
    this.notificationService.openSnackBar('Book assigned successfully!', 'Close', 'success');
  }

  showErrorNotification(message: string) {
    this.notificationService.openSnackBar(message, 'Close', 'error');
  }

  assignBook(book: any){
    console.log('book', book);
    const dialogRef = this.dialog.open(AssignBookModalComponent, {
      width: '550px',
      height: '500px',
      data: { book: book }
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log('data from dialog', data);
      if (data.clicked === 'submit') {
        this.assignBookService.assignBookToUser(book.isbn,data.student._id, data.dueDate, data.student.username).subscribe((res:any) => {
          console.log('book assigned',res);
          this.showSuccessNotification();
          this.getBooks(1, this.pageSize);
        }, (error: any) => {
          console.log('error', error);
        this.showErrorNotification(error.error.error);
        });
      }
    });
  }

  showBookInfo(book: any){
    console.log('book', book);
    const dialogRef = this.dialog.open(BookInfoComponent, {
      width: '550px',
      height: '500px',
      data: { book: book }
    });
    dialogRef.afterClosed().subscribe((data) => {
    });
  }

  resetSearch(){
    this.searchText = '';
    this.getBooks(1, this.pageSize)
  }

  searchBooks(){
    console.log('search', this.searchText);
    this.inventoryService.searchBook(this.searchText).subscribe((res: any) => {
      if(res['books'].length === 0){
        this.showErrorNotification('No books found');
        return;
      }
      this.bookList = res['books'];
      this.totalItems = res['totalItems'];
      this.dataSource.data = this.bookList;
      this.paginator.length = this.totalItems;
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = this.pageSize;
    }, (error: any) => {
      console.log('error', error);
    })
  }

  deleteBook(book: any){
    console.log('book', book);
    if(book.assigned !== 0){
      this.showErrorNotification('Book is assigned to a student. Cannot delete');
      return;
    }
    this.openConfirmationDialog(book);
  }

  openConfirmationDialog(book: any) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Are you sure you want to delete this book?',
          buttonText: {
            ok: 'Yes',
            cancel: 'No'
          },
          for: 'deleteBook'
        }
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.inventoryService.deleteBook(book.isbn).subscribe((res: any) => {
            console.log('book deleted', res);
            this.notificationService.openSnackBar('Book Deleted successfully!', 'Close', 'success');;
            this.getBooks(1, this.pageSize);
          }, (error: any) => {
            console.log('error', error);
          })
        }else{
  
        }
      });
    }
  
}

export interface BookData {
  'Book Name': string;
  'Author': number;
  'Quantity': number;
  'ISBN': string;
}

