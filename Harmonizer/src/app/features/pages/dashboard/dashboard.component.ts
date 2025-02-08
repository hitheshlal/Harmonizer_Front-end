import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { BoardComponent } from '../../kanban/Kanban-board/board.component';
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component";


@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, BoardComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
