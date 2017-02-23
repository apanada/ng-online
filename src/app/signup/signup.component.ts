import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';
declare let jQuery: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  success: any;
  error: any;

  constructor(private af: AngularFire) { }

  signUp(email: any, password: any, username: any) {
    this.af.auth.createUser({
      email: email,
      password: password
    }).then(
      (success) => {
        this.success = success;
        let currentUser = firebase.auth().currentUser;

        currentUser.updateProfile({
          displayName: username,
          photoURL: "http://winkeyecare.com/wp-content/uploads/2013/03/Empty-Profile-Picture.jpg"
        }).then(function() {
          jQuery('#myModal').modal('hide');
          location.reload();
        }, function(error) {
          this.error = error;
        });
      }).catch(
      (err) => {
        this.error = err;
      })
  }

  onSubmit(formData) {
    if (formData.valid) {
      this.signUp(formData.value.email, formData.value.password, formData.value.username);
    }
  }

  ngOnInit() {
  }
}
