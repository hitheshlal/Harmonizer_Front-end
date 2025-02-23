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


FunctionCall(functionName: string, task: any){
  if(functionName === "editTask"){
    this.taskService.editTask(task)
  }
  else if(functionName === 'deleteTask'){
    this.taskService.deleteTask(task);
  }

}


}
