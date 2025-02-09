import { UserProfile } from './../login/login.component';
import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api/api.service';

interface User {
  name: string;
  email: string;
  createdAt: string;
  photoUrl: string;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

UserProfile : any = {}

constructor(private route: Router, private api: ApiService){}

  ngOnInit(){
    let userid = localStorage.getItem('Userid')
    console.log("from user profile page", userid)

    if(userid)
    this.api.GetUserDetails(userid).subscribe((res:any)=>{
      console.log(res)
      this.UserProfile = res;
      this.UserProfile.picture = res.picture;
    })

    // user: any = {
    //   name: this.UserProfile.name,
    //   email: 'sarah.anderson@example.com',
    //   createdAt: '2024-01-15',
    //   photoUrl: '/api/placeholder/128/128' // Using placeholder for demo
    // };
  }



  logout(){
    localStorage.removeItem('Userid')
    localStorage.removeItem('Token')
    alert("storage cleared successfully")
    this.route.navigate(['/login'])
  }

}
