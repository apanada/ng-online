import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
declare let jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  success: any;
  error: any;
  user: any = {};
  hide: boolean = false;

  onSignup(e) {
    this.hide = true;
  }

  onLogin(e) {
    this.hide = false;
  }

  constructor(private af: AngularFire) { }

  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
      (success) => {
        this.success = success;
        jQuery('#myModal').modal('hide');
        location.reload();
      }).catch(
      (err) => {
        this.error = err;
      })
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
      (success) => {
        this.success = success;
        jQuery('#myModal').modal('hide');
        location.reload();
      }).catch(
      (err) => {
        this.error = err;
      })
  }

  loginEmail(email: any, password: any) {
    this.af.auth.login({
      email: email,
      password: password
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
      (success) => {
        this.success = success;
        jQuery('#myModal').modal('hide');
        location.reload();
      }).catch(
      (err) => {
        this.error = err;
      })
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.loginEmail(formData.value.email, formData.value.password);
    }
  }

  ngOnInit() {
  }
}
