import { User } from './../../models/user';
import { UserService } from '../../providers/user/user.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth.service';
import 'rxjs/add/operator/first'

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
    public userService: UserService,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
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
    let formUser  = this.signupForm.value
    let loading:Loading = this.showLoading();
    let username: string = formUser.username

    this.userService.userExists(username)
      .first()
      .subscribe((userExists:boolean)=>{
        if(!userExists){
          this.authService.createAuthUser({email: formUser.email, password: formUser.password})
            .then((newUser) =>{

              delete formUser.password

              console.log(newUser);
              console.log(newUser.user.uid);

              let uuid: string = newUser.user.uid;

              this.userService.create(formUser, uuid).then(()=>{
                console.log('Usuario cadastrado');
                loading.dismiss();
              }).catch((error: any)=>{
                console.log(error);
                loading.dismiss();
                this.showAlert(error);
              })
            }).catch((error: any)=>{
              console.log(error);
              loading.dismiss();
              this.showAlert(error);
            });
        }else{
          this.showAlert('O username'+ username + 'já está sendo usado em outra conta!')
          loading.dismiss();
        }
      })





  }

  private showLoading(): Loading{
    let loading = this.loadingCtrl.create({content: 'Please wait...'});

    return loading;
  }

  private showAlert(message:string):void{
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }
}
