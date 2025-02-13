import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { format } from 'date-fns';

export interface Task {
  id: string;
  title: string;
  description: string;
  date?: string;
  dueDate?: string;
  statusId: number;
}

enum TaskStatus {
  ToDo = 1,
  InProgress = 2,
  Done = 3
}
@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  constructor(private api: ApiService) { }

  public toDoTasksSubject = new BehaviorSubject<Task[]>([]);
  public inProgressTasksSubject = new BehaviorSubject<Task[]>([]);
  public doneTasksSubject = new BehaviorSubject<Task[]>([]);

  toDoTasks$: Observable<Task[]> = this.toDoTasksSubject.asObservable();
  inProgressTasks$: Observable<Task[]> = this.inProgressTasksSubject.asObservable();
  doneTasks$: Observable<Task[]> = this.doneTasksSubject.asObservable();

  Tasks : any[] = []
  TasksForSort : any[] = []
  loadTasks(): void {
    const userid = localStorage.getItem('Userid');

    if (!userid) {
      console.error('User ID not found in localStorage');
      return;
    }

    this.api.getTaskByUserId(userid).subscribe((res:any)=>{
      try {
        this.Tasks = res
        this.TasksForSort = res
        console.log("this.Tasks" , this.Tasks)

        this.updateBehaviorSubjects()

      } catch (err) {
        console.error('Error during task processing:', err);
      }
    })
  }

  sortTasksForday(timeframe: 'today' | 'tomorrow'){

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaystr = today.toISOString().split('T')[0];
    const tomorrowstr = tomorrow.toISOString().split('T')[0];

    console.log(`Sorting tasks for ${timeframe}`);
    console.log("Today's date:", todaystr);
    console.log("Tomorrow's date:", tomorrowstr);

    const filteredTasks = this.TasksForSort.filter(task => {
      const taskDueDate = task.dueDate ? format(task.dueDate, 'yyyy-MM-dd') : null
      console.log("task due date",taskDueDate)

      if(timeframe === 'today'){
        return taskDueDate === todaystr;
      }else{
        return taskDueDate === tomorrowstr;
      }

    });
    console.log("today's task", filteredTasks)
    this.Tasks = filteredTasks
    this.updateBehaviorSubjects();

  }

  updateBehaviorSubjects(){

    this.toDoTasksSubject.next(
      this.Tasks.filter(task => task.statusId === TaskStatus.ToDo)
    );
    this.inProgressTasksSubject.next(
      this.Tasks.filter(task => task.statusId === TaskStatus.InProgress)
    );
    this.doneTasksSubject.next(
      this.Tasks.filter(task => task.statusId === TaskStatus.Done)
    );
  }
}


