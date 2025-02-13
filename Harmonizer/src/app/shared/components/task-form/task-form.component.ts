import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-form',
  imports: [MatDialogModule, MatButtonModule, CommonModule,
        ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
   ],
   providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  taskForm: FormGroup;
  dialogTitle: string;
  submitButtonText: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogTitle = data?.task ? 'Edit Task' : 'Add New Task';
    this.submitButtonText = data?.task ? 'Update' : 'Add Task';

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      duedate: ['']
    });

    if (data?.task) {
      this.taskForm.patchValue({
        title: data.task.title,
        description: data.task.description,
        duedate: data.task.dueDate
      });
    }

  }

  ngOnInit(): void {}

  // Getter for easy access to form fields
  get f() {
    return this.taskForm.controls;
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    } else {
      Object.keys(this.taskForm.controls).forEach(key => {
        const control = this.taskForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}

