import { Component, OnInit } from '@angular/core';
import { ShowApplyButtonService } from './services/show-apply-button.service';
import { AuthService } from './services/auth.service';
import { take } from 'rxjs';
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

  constructor(private show: ShowApplyButtonService, private showbtn: ShowLoginLogoutButtonService, private auth: AuthService ) {    
  }
  ngOnInit(): void {
    this.auth.LoginLogoutButton.subscribe(val => {
      this.isLoggedIn = val!;
    })

  }

  clickLogout(){
    this.auth.logout();
  }
}
