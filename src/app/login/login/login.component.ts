import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <form
        clrForm
        clrLayout="vertical"
        (ngSubmit)="login()"
        [formGroup]="loginForm"
      >
        <div class="clr-form-control">
          <label for="user" class="clr-control-label">Username</label>
          <div class="clr-control-container">
            <div class="clr-input-wrapper">
              <input
                type="text"
                id="user"
                class="clr-input"
                formControlName="email"
              />
            </div>
          </div>
        </div>
        <div class="clr-form-control">
          <label for="password" class="clr-control-label">Password</label>
          <div class="clr-control-container">
            <div class="clr-input-wrapper">
              <input
                type="password"
                id="password"
                class="clr-input"
                formControlName="password"
              />
            </div>
          </div>
        </div>

        <div class="login-actions">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
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
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.SignIn(email, password);
  }
}
