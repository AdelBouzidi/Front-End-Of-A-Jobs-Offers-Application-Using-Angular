import { Component, OnInit } from '@angular/core';
import { ShowApplyButtonService } from '../services/show-apply-button.service';
import { Subject } from 'rxjs';
import { ShowLoginLogoutButtonService } from '../services/show-login-logout-button.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit{
  constructor(private show : ShowApplyButtonService, private showbtn: ShowLoginLogoutButtonService) {
  }
  ngOnInit(): void {
    // this.showbtn.cndSubject.next(true);
    this.show.user.cndIsOnline = true;
    this.show.user.recIsOnline = false;
  }
}


