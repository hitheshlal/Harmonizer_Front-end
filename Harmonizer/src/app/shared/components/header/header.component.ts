import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api/api.service';
import { CommonModule } from '@angular/common';

interface UserProfile {
  picture?: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  UserProfile: UserProfile | null = null;
  isLoading = true;

  constructor(private route: Router, private api: ApiService) {}

  ngOnInit() {
    const userid = localStorage.getItem('Userid');
    console.log("from user profile page", userid);

    if (userid) {
      this.api.GetUserDetails(userid).subscribe({
        next: (res: any) => {
          console.log(res);
          this.UserProfile = res;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        }
      });
    }
  }
}
