import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { CustomAlertComponent } from '../../../shared/components/custom-alert/custom-alert.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api/api.service';
import { jwtDecode } from "jwt-decode";

export interface UserProfile {
  Google_id: string;
  email: string;
  name: string;
  picture: string;
  // Add other fields you need
}
declare var google: any;
declare var Token : any;

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userProfile: any;
  EmailId: any;
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
      const decodedToken = this.decodeJwtResponse(response.credential);

      this.userProfile = {
        id: decodedToken.sub,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture
      };

      this.api.Login(this.userProfile).subscribe({
        next: (res: any) => {
          if (!res.token) {
            throw new Error('No token received in response');
          }

          try {
            const decoded: any = jwtDecode(res.token);

            localStorage.removeItem('Token');
            localStorage.removeItem('Userid');

            localStorage.setItem('Token', res.token);
            localStorage.setItem('Userid', res.userid);

            console.log("Response : ", res)
            console.log("Token:", localStorage.getItem('Token'));
            console.log("User ID:", localStorage.getItem('Userid')); // Fixed the log to match storage key



            this.showAlert("Login Success", "Success");
            this.router.navigate(['/dashboard']);

          } catch (error: any) {
            console.error('Error processing login response:', error.message);
            this.showAlert("Login Failed", "Error processing login response");
          }
        },
        error: (error) => {
          console.error('Login request failed:', error);
          this.showAlert("Login Failed", "Unable to connect to server");
        }
      });

    } catch (error) {
      console.error('Error during login:', error);
      this.showAlert("Login Failed", "Error during login process");
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


