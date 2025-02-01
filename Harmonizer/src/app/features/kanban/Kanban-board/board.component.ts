import { Component, ViewChild } from '@angular/core';
import { TaskCardComponent } from "../task-card/task-card.component";
import { CommonModule, SlicePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../../../shared/components/custom-alert/custom-alert.component';
import { Router } from '@angular/router';

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

  // statuses: Array<'ToDo' | 'InProgress' | 'Done'> = ['ToDo', 'InProgress', 'Done'];
  // tasks: Task[] = [];

constructor(private api: ApiService, private dialog: MatDialog, private router: Router){}

  taskForm = new FormGroup({
    title : new FormControl('', [Validators.required]),
    description : new FormControl(''),
    duedate : new FormControl('')
  })
  // // Convenience getter for easy access to form fields
  get f() { return this.taskForm.controls; }

showKanban = true;
showTaskForm = false;



ngOnInit() {
  this.loadTasks();
}

loadTasks() {
  const userid = 1;
  this.api.getTaskByUserId(userid).subscribe((tasks: any) => {
    this.toDoTasks = tasks.filter((task: { statusId: TaskStatus; }) => task.statusId === TaskStatus.ToDo);
    this.inProgressTasks = tasks.filter((task: { statusId: TaskStatus; }) => task.statusId === TaskStatus.InProgress);
    this.doneTasks = tasks.filter((task: { statusId: TaskStatus; }) => task.statusId === TaskStatus.Done);
  });
}

showAddTaskForm() {
    this.showKanban = false;
    this.showTaskForm = true;
}

cancelAddTask(){
    this.showKanban = true;
    this.showTaskForm = false;
}

onSubmit(){
      if(this.taskForm.valid){
        console.log('Form submitted', this.taskForm.value)

        if(!this.taskForm.value.duedate){
          this.taskForm.value.duedate = null;
        }

        const newTask = {
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          dueDate: this.taskForm.value.duedate,
          userId: "1",
          statusId: 1
        };

        this.api.CreateTask(newTask).subscribe((res:any)=>{
          console.log(res);
          if(res){
            this.showAlert('Task added To-Do List Successfully', 'Success' )
               // this.router.navigate(['/dashboard']);

          }
        })

        this.showKanban = true;
        this.showTaskForm = false;
      }else{
        console.log('Form not valid')
        this.showAlert('Please fill in all required fields.', 'Alert');
      }
}

entered(event: CdkDragEnter) {
  if (event.container !== event.item.dropContainer) {
    const containerElement = event.container.element.nativeElement;
    containerElement.classList.add('cdk-drop-list-receiving');
  }
}

drop(event: CdkDragDrop<any[]>) {

  document.querySelectorAll('.cdk-drop-list-receiving')
      .forEach(element => element.classList.remove('cdk-drop-list-receiving'));

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


    // ({
    //   next: () => {
    //     // Optionally refresh the board
    //     this.loadTasks();
    //   },
    //   error: (error: any) => {
    //     console.error('Error updating task status:', error);
    //     // Optionally show error message
    //     this.showAlert('Failed to update task status', 'Error');
    //   }
    // });
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
}
