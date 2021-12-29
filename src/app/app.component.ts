import { Component } from '@angular/core';
import '@cds/core/icon/register.js';
import {
  ClarityIcons,
  loginIcon,
  logoutIcon,
  shoppingBagIcon,
} from '@cds/core/icon';
import { AuthService } from './auth.service';

ClarityIcons.addIcons(shoppingBagIcon, loginIcon, logoutIcon);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'groceries';

  isLoggedIn: boolean = false;

  constructor(private auth: AuthService) {
    this.auth.loggedIn$.subscribe({
      next: (loggedIn) => (this.isLoggedIn = loggedIn),
    });
  }

  async logout() {
    await this.auth.SignOut();
  }
}
