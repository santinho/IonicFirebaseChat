import { HomePage } from './../home/home';
import { SignupPage } from './../signup/signup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  signinForm: FormGroup;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public auth: AuthService,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
            ) {
                this.signinForm = this.formBuilder.group({
                  password: [''],
                  email: [''],
                });
  }

  onSubmit():void{
    let loading:Loading = this.showLoading();
    console.log(this.signinForm.value)
    this.auth.signWithEmail({email:this.signinForm.value.email,
      password: this.signinForm.value.password }).then((credential)=>{
        loading.dismiss();
        this.navCtrl.setRoot(HomePage)
      })
      .catch((error: any)=>{
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      })
  }

  onSignup2():void{
    this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
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

  onHomePage():void{
    this.navCtrl.push(HomePage).then((hasAcess: boolean)=>{
      console.log('Autorizado!', hasAcess)
    }).catch(err=>{
      console.log('Não Autorizado!')
    })
  }

  onLogout():void{
    this.auth.logout();
  }
}
