import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="login-actions">
        <button type="submit" class="btn btn-primary" (click)="login()">
          Login
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        flex: 1;
        justify-content: center;

        .login-actions {
          margin-top: 1rem;
        }
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.authService.loginWithGoogle();
  }
}
