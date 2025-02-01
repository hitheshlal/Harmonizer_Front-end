import { DatePipe, SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-card',
  imports: [SlicePipe, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
@Input() task :any;

deleteTask(arg0: any) {
throw new Error('Method not implemented.');
}
editTask(arg0: any) {
throw new Error('Method not implemented.');
}

}
