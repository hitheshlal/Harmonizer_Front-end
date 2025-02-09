import { Component, ViewChild } from '@angular/core';
import { TaskCardComponent } from "../task-card/task-card.component";
import { CommonModule, SlicePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from '../../../core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../../../shared/components/custom-alert/custom-alert.component';
import { Router } from '@angular/router';
import { TaskFormComponent } from '../../../shared/components/task-form/task-form.component';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  statusId: number;
}
enum TaskStatus {
  ToDo = 1,
  InProgress = 2,
  Done = 3
}
@Component({
  selector: 'app-board',
  imports: [TaskCardComponent, CommonModule, ReactiveFormsModule,DragDropModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  @ViewChild('todoList') todoList!: CdkDropList;
  @ViewChild('inProgressList') inProgressList!: CdkDropList;
  @ViewChild('doneList') doneList!: CdkDropList;

  toDoTasks : Task[] = [];
  inProgressTasks : Task[] = [];
  doneTasks : Task[] = [];

constructor(private api: ApiService, private dialog: MatDialog){}

  // taskForm = new FormGroup({
  //   title : new FormControl('', [Validators.required]),
  //   description : new FormControl(''),
  //   duedate : new FormControl('')
  // })
  // // Convenience getter for easy access to form fields
  // get f() { return this.taskForm.controls; }


ngOnInit() {
  this.loadTasks();
}

loadTasks() {

  const userid = localStorage.getItem('Userid');

  if (!userid) {
    console.error('User ID not found in localStorage');
    return;
  }
    this.api.getTaskByUserId(userid).subscribe((tasks: any) => {
      this.toDoTasks = tasks.filter((task: { statusId: TaskStatus; }) => task.statusId === TaskStatus.ToDo);
      this.inProgressTasks = tasks.filter((task: { statusId: TaskStatus; }) => task.statusId === TaskStatus.InProgress);
      this.doneTasks = tasks.filter((task: { statusId: TaskStatus; }) => task.statusId === TaskStatus.Done);
    });
}

entered(event: CdkDragEnter) {
  if (event.container === event.item.dropContainer) {
    const containerElement = event.container.element.nativeElement;
    containerElement.classList.add('cdk-drop-list-receiving');

  }
}

drop(event: CdkDragDrop<any[]>) {

  // Log the container information
  console.log("Container ID:", event.container.id);
  console.log("Container Element:", event.container.element.nativeElement);
  console.log("Container Classes:", event.container.element.nativeElement.classList);

      if (event.previousContainer === event.container) {

        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }else{
        // Handle moving between lists
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    const movedTask = event.container.data[event.currentIndex];
    const newStatus = event.container.id;
    console.log(movedTask.id)
    console.log(newStatus)
    const newStatusId = this.getStatusFromContainer(newStatus)
    console.log(newStatusId)
    const updatedTask = {
      Id: movedTask.id,
      statusId: newStatusId
    };
    console.log("moved task",updatedTask.Id,"statusId",newStatusId)
    this.api.updateTaskStatus(updatedTask).subscribe((res) => {
      console.log(res);
      this.loadTasks();
    })
      }


}

exited(event: CdkDragExit<any>) {
  const containerElement = event.container.element.nativeElement;
  containerElement.classList.remove('cdk-drop-list-receiving');
}

private getStatusFromContainer(container: any): TaskStatus {
      if(container === "todoList") return TaskStatus.ToDo;
      if(container === "inProgressList") return TaskStatus.InProgress;
       return TaskStatus.Done;
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


showAddTaskForm() {
  const dialogRef = this.dialog.open(TaskFormComponent, {
    width: '500px',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Handle the new task data
      this.addNewTask(result);
      console.log(result);
    }
  });
}

addNewTask(result: any){
  console.log('Form submitted', result)

        if(!result.duedate){
          result.duedate = null;
        }
        const userid = localStorage.getItem('Userid');
        const newTask = {
          title: result.title,
          description: result.description,
          dueDate: result.duedate,
          userId: userid,
          statusId: 1
        };

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
}
