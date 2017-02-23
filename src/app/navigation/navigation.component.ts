import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  success: any;
  error: any;
  user: any = {};

  constructor(private af: AngularFire, private router: Router) {
    this.af.auth.subscribe(user => {
      if (user) {
        this.user = user.auth.providerData[0];
      }
      else {
        this.user = {};
      }
    });
  }

  logout() {
    this.af.auth.logout();
  }

  isUserLoggedIn() {
    return (Object.keys(this.user).length === 0);
  }
}
