import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { CustomAlertComponent } from '../../../shared/components/custom-alert/custom-alert.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api/api.service';

export interface UserProfile {
  Google_id: string;
  email: string;
  name: string;
  picture: string;
  // Add other fields you need
}
declare var google: any;

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userProfile: any;
  userId: any;
  constructor(private router: Router, private dialog: MatDialog, private api: ApiService) {}

  ngOnInit() {
    // Initialize Google Sign-In
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true
    });

    // Render the button
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {
        theme: "outline",
        size: "large",
        width: 250
      }
    );

    // Optional: Display the One Tap dialog
    google.accounts.id.prompt();
  }
  async handleCredentialResponse(response: any) {
    try {
      // Decode the credential response
      const decodedToken = this.decodeJwtResponse(response.credential);

      // Set user profile
      this.userProfile = {
        id: decodedToken.sub,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture
      };
      this.api.Login(this.userProfile).subscribe((res:any)=>{
        console.log(res)
        console.log('userid :', res.userId);
        this.userId = res.userId;
        localStorage.setItem('userid',this.userId);

      })
      this.showAlert("Login Success", "Success")
      // Navigate to dashboard or home page
      this.router.navigate(['/dashboard']);

    } catch (error) {
      console.error('Error during login:', error);
      // Handle error appropriately
    }
  }

  private decodeJwtResponse(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
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
