import { UserService } from './../../providers/user/user.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserService
    ) {
    this.signupForm = this.formBuilder.group({
      name: [''],
      username: [''],
      password: [''],
      email: [''],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSubmit():void{
    console.log('Form Submit')
    console.log(this.signupForm.value);
    this.userService.create(this.signupForm.value).then(()=>{
      console.log('Usuario cadastrado');
    })
  }

}
