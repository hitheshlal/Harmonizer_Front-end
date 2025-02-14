import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-alert',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.scss'
})
export class CustomAlertComponent {

  constructor(
    public dialogRef: MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title?: string; message: string } ,
    private router : Router
  ) {}

  onClose(): void {
    // this.router.navigate(['/dashboard']);
    window.location.reload();
    this.dialogRef.close();

  }

}
