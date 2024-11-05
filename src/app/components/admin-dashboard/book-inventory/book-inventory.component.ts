import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ManageInventoryService } from '../../../services/manage-inventory.service';
import { HttpClientModule } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-inventory',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, HttpClientModule, CommonModule],
  templateUrl: './book-inventory.component.html',
  styleUrl: './book-inventory.component.scss',
  providers: [ManageInventoryService]
})
export class BookInventoryComponent  implements AfterViewInit {
  bookList: any = [];
  ELEMENT_DATA: BookData[] = [];
  enableUpload: boolean = false;
  fileError: string = '';


  constructor(private inventoryService: ManageInventoryService){}

  ngOnInit(){
    this.getBooks(1, this.pageSize);
  }

  selectedFile: File | null = null;

  displayedColumns: string[] = ['Book Name', 'Author', 'Quantity'];
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

  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     this.selectedFile = input.files[0];
  //     this.enableUpload = true;
  //   }
  // }

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
}

export interface BookData {
  'Book Name': string;
  'Author': number;
  'Quantity': number;
}

