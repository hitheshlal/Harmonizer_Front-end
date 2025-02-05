import { DatePipe, SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';

@Component({
  selector: 'app-task-card',
  imports: [SlicePipe, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
@Input() task :any;

constructor(private api : ApiService){}

deleteTask(task: any) {
var taskId = task.id;
this.api.DeleteTask(taskId).subscribe((res:any)=>{
console.log(res);
})
}
editTask(arg0: any) {
throw new Error('Method not implemented.');
}

}
