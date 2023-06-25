import { Component, OnInit } from '@angular/core';
import { ShowApplyButtonService } from './services/show-apply-button.service';
import { AuthService } from './services/auth.service';
import { BehaviorSubject, take } from 'rxjs';
import { ShowLoginLogoutButtonService } from './services/show-login-logout-button.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Offer_Job_Angular';
  isLoggedIn : boolean = false;
  hideButtonLoginSignUp : boolean = false;
  showLinkProfileCandidate : boolean = false;
  showLinkProfileRecruiter : boolean = false;

  constructor(private show: ShowApplyButtonService, 
    private showbtn: ShowLoginLogoutButtonService, 
    private auth: AuthService,
    private _router: Router) {    
  }
  ngOnInit(): void {
    this._router.navigate(['offer']);

    this.auth.LoginLogoutButton.subscribe(val => {
      this.isLoggedIn = val!;
    })
    this.auth.LoginLogoutButton2.subscribe(value => {
      this.hideButtonLoginSignUp = value!;
    })
    this.auth.ShowLinkProfilCandidateInHomePage.subscribe(val => {
      if(val){
        this.showLinkProfileCandidate = true;
        this.showLinkProfileRecruiter = false;
      }else{
        this.showLinkProfileCandidate = false; 
      }
    })
    this.auth.ShowLinkProfilRecruiterInHomePage.subscribe(val => {
      if(val){
        this.showLinkProfileRecruiter = true;
        this.showLinkProfileCandidate = false;
      }else{
        this.showLinkProfileRecruiter = false; 
      }
    })
  }

  clickLogout(){
    this.auth.logout();
  }
}
