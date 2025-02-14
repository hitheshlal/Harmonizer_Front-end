import { DatePipe, SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { Router } from '@angular/router';
import { TaskFormComponent } from '../../../shared/components/task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { format } from 'date-fns';
import { KanbanService } from '../services/kanban.service';

@Component({
  selector: 'app-task-card',
  imports: [SlicePipe, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
@Input() task :any;

constructor(private api : ApiService, private router: Router, private dialog: MatDialog,
            private taskService: KanbanService
){}

deleteTask(task: any) {

  var taskId = task.id;
  if (window.confirm("Are you sure you want to delete this task?")){

        this.api.DeleteTask(taskId).subscribe((res:any)=>{
        console.log(res);
        })
  }
  window.location.reload();
}

editTask(task: any) {
  // First get the task details
  this.api.getTaskById(task.id).subscribe((taskDetails: any) => {
    // Open dialog with the task details
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
      data: { task: taskDetails }
    });

    // Handle the dialog close event
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result)
        if(!result.duedate){
          result.duedate = null;
        }
        console.log("Date from edit Task first:", result.duedate)
        console.log("title from edit Task:", result.title)
        const userid = localStorage.getItem('Userid');
        const newTask = {
          title: result.title,
          description: result.description,
          dueDate: result.duedate ? format(result.duedate, 'yyyy-MM-dd') : null,
          userId: userid,

        };
        console.log("Date from edit Task second:", result.duedate)
        console.log("Date from edit Task third:", newTask.dueDate)
        // Update the task with the new data
        this.api.UpdateTask(task.id, newTask).subscribe((res: any) => {
          console.log('Task updated:', res);
          this.taskService.loadTasks();
        });
      }
    });
  });
}

}
