import { Observable } from 'rxjs';
import { AngularFireList } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { User } from '../../models/user';
import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any

  constructor(public navCtrl: NavController, public userService: UserService) {

  }

  onSignup():void{
    this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad(){
    this.users = this.userService.users.valueChanges().single();
  }

}
