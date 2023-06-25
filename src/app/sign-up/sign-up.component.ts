import { Component, OnInit, ViewChild } from '@angular/core';
import { SignupRecruiterModel } from '../auth/signupRecruiter-model';
import { SignupCandidateModel } from '../auth/signupCandidate-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AddUsersService } from '../services/add-users.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  

  constructor(private http : HttpClient, private _router: Router,private auth: AuthService, private addUser: AddUsersService) {    
  }
  ngOnInit(): void {
  }
}
