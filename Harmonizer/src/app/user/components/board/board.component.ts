import { Component } from '@angular/core';
import { TaskCardComponent } from "../task-card/task-card.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  imports: [TaskCardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  taskForm = new FormGroup({
    title : new FormControl(''),
    description : new FormControl('')
  })

showKanban = true;
showTaskForm = false;

  toDoTasks = [
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'ToDo' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'ToDo' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'ToDo' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'ToDo' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'ToDo' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'ToDo' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'ToDo' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'ToDo' },

  ];
  inProgressTasks = [
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'InProgress' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'InProgress' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'InProgress' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'InProgress' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'InProgress' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'InProgress' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'InProgress' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'InProgress' },
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'InProgress' },

  ];

  doneTasks = [
    { title: 'Design', description: 'Create light and dark mode', date: '20-01-2025', status: 'Done' },
  ];

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
        this.showKanban = true;
        this.showTaskForm = false;
      }else{
        console.log('Form not valid')
      }
    }




}
