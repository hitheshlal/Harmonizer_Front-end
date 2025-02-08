import { DatePipe, SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { Router } from '@angular/router';
import { TaskFormComponent } from '../../../shared/components/task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-card',
  imports: [SlicePipe, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
@Input() task :any;

constructor(private api : ApiService, private router: Router, private dialog: MatDialog){}

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
        const userid = localStorage.getItem('userid');
        const newTask = {
          title: result.title,
          description: result.description,
          dueDate: result.duedate,
          userId: userid,

        };
        // Update the task with the new data
        this.api.UpdateTask(task.id, newTask).subscribe((res: any) => {
          console.log('Task updated:', res);
          window.location.reload();
        });
      }
    });
  });
}

}
