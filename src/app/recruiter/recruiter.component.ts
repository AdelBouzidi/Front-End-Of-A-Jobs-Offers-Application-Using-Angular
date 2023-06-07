import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowApplyButtonService } from '../services/show-apply-button.service';
import { Subject } from 'rxjs';
import { ShowLoginLogoutButtonService } from '../services/show-login-logout-button.service';


@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit{
  jobAdded: boolean = false;
  constructor(private _router: Router, private show : ShowApplyButtonService, private showbtn: ShowLoginLogoutButtonService) {
  }
  ngOnInit(): void {
    // this.showbtn.recSubject.next(true);
    this.show.user.cndIsOnline = false;
    this.show.user.recIsOnline = true;
    console.log(this.show.CandidateOnline());
  }
  AddJob(){
    this.jobAdded = true;
    this._router.navigate(['addjob']);
  }
}



