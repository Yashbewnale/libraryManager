import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StudentDataService } from '../../services/student-data.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-assign-book-modal',
  standalone: true,
  imports: [FormsModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatDialogModule, MatDatepickerModule, MatInputModule, CommonModule,MatProgressSpinnerModule ],
  templateUrl: './assign-book-modal.component.html',
  styleUrl: './assign-book-modal.component.scss',
  providers: [StudentDataService, provideNativeDateAdapter()]
})
export class AssignBookModalComponent {
  control = new FormControl('');
  students: any[] = [];
  filteredStudents!: Observable<any[]>;
  bookToAssign: any;
  selectedStudent: any;
  dueDate: any;
  today: Date = new Date();
  isLoading: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<AssignBookModalComponent>,
    private studentService: StudentDataService,
    private router: Router
  ) {
    console.log('book received', data);
    this.bookToAssign = data;
    this.studentService.getAllStudents().subscribe((students: any) => {
      this.students = students;
      this.isLoading = false;
    });
   }

  ngOnInit() {
    this.filteredStudents = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    if(typeof value === 'object') {
      return [value];
    }
    const filterValue = value.toLowerCase();
  
    return this.students.filter((student: any) => {
      // Safely check if student.fullName exists and is a string
      const fullName = student.fullName ? student.fullName.toLowerCase() : '';
      return fullName.includes(filterValue);
    });
  }

  getOptionText(option: any) {
    return option.fullName;
  }
  
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };


  submit() {
    console.log('selected student', this.control.value);
    console.log('selected date', this.dueDate);

    this.dialogRef.close({
      student: this.control.value,
      dueDate: this.dueDate,
      clicked: 'submit'
    });
  }

  close() {
    this.dialogRef.close();
  }

  registerStudent(){
    this.dialogRef.close();
    this.router.navigate(['dashboard/regStudent']);
  }

}
