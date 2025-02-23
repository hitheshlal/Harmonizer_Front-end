import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { format } from 'date-fns';
import { CustomAlertComponent } from '../../../shared/components/custom-alert/custom-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../../shared/components/task-form/task-form.component';

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

  constructor(private api: ApiService , private dialog: MatDialog) { }

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

  addNewTask(result: any){
    console.log('Form submitted', result)

          if(!result.duedate){
            result.duedate = null;
          }
          const userid = localStorage.getItem('Userid');
          let dueDate = result.duedate ? new Date(result.duedate) : null;

          const newTask = {
            title: result.title,
            description: result.description,
            dueDate:  dueDate ? format(dueDate, 'yyyy-MM-dd') : null,
            userId: userid,
            statusId: 1
          };
          console.log("last due date", newTask.dueDate)

          this.api.CreateTask(newTask).subscribe((res:any)=>{
            console.log(res);
            if(res){
              this.showAlert('Task added To-Do List Successfully', 'Success' )
            }else{
              console.log('Form not valid')
              this.showAlert('Please fill in all required fields.', 'Alert');
            }
      });
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
              this.loadTasks();
            });
          }
        });
      });
    }

    deleteTask(task: any) {

      var taskId = task.id;
      if (window.confirm("Are you sure you want to delete this task?")){

            this.api.DeleteTask(taskId).subscribe((res:any)=>{
            console.log(res);
            })
      }
      window.location.reload();
    }

    showAlert(message: string, title: string) {
          this.dialog.open(CustomAlertComponent, {
            data: {
              title: title,
              message: message
            },
            disableClose: true
          });
    }
}


