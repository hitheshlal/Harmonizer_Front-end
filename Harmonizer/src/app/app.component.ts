import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomAlertComponent } from './shared/components/custom-alert/custom-alert.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Harmonizer';
  
}
