import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { BoardComponent } from "../../components/board/board.component";

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, BoardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
