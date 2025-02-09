import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api/api.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  UserProfile : any

  constructor(private route: Router, private api: ApiService){}

    ngOnInit(){
      let userid = localStorage.getItem('Userid')
      console.log("from user profile page", userid)


  this.api.GetUserDetails(userid).subscribe((res:any)=>{
    console.log(res)
    this.UserProfile = res;
  })

}
}
