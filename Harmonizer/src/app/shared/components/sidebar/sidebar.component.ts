import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { TaskModalComponent } from '../../../features/kanban/task-modal/task-modal.component';
import { BoardComponent } from '../../../features/kanban/Kanban-board/board.component';
import { KanbanService } from '../../../features/kanban/services/kanban.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
 activeButton: string = 'all'

  constructor(
    public router: Router,
    private dialog: MatDialog,
    private taskService: KanbanService
  ) {}

  navigate(path: string) {
    this.router.navigate([`/${path}`]);
  }
  loadTask(buttonType:string){
    this.activeButton = buttonType;
    this.taskService.loadTasks()
  }

  showSortedTasks(day:any) {
    this.activeButton = day
    this.taskService.sortTasksForday(day);
  }

}
