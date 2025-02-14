import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KanbanService } from '../services/kanban.service';
import { CommonModule } from '@angular/common';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  statusId: string;
}

@Component({
  selector: 'app-task-modal',
  imports: [MatCardModule, CommonModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent {

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public tasks: Task[],
    private taskService : KanbanService
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    console.log("today's tasks", this.tasks)
  }

}
