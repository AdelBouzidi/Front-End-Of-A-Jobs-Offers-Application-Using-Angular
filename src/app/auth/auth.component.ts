import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from './user-model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  @ViewChild('f') signUpForm: NgForm | any;
  email: string | any;
  password: string | any;
  role: string | any;
  verify_pw: string | undefined;
  user : any;
  Found : boolean | undefined;
  errorMssg : boolean = false;
  errorMssgHtml : string | undefined;
  token : UserModel | undefined;
  isLoading : boolean = false;
  ngOnInit(): void {
  }
  constructor(private http : HttpClient, private _router: Router,private auth: AuthService) {    
  }

  onFormSubmit(){
    this.isLoading = true;
    this.email = this.signUpForm.value.email
    this.password = this.signUpForm.value.password;
    this.role = this.signUpForm.value.user; 
    
    this.auth.login(this.email, this.password,  this.role).subscribe(
      (response)=> {
      let GetUser = new UserModel();
      GetUser.userCode = response[0].userCode; 
      GetUser.nbf = response[0].nbf;
      GetUser.roleCode = response[0].roleCode;
      GetUser.exp = response[0].exp; 
      GetUser.iss = response[0].iss; 
      GetUser.aud = response[0].aud; 

      this.auth.userIs.online = true;

      // if(GetUser.exp != null){
      //   let def = (parseInt(Number(GetUser.exp).toString()))-(parseInt(Number(GetUser.nbf).toString()));
      //   let def2 = (new Date().getTime()/1000 + +def)*1000; 
      //   console.log(new Date(def2));
      //   console.log(parseInt(Number(GetUser.nbf).toString())/1000);
      //  }


      this.signUpForm.reset();     
      this.isLoading = false;                     
      if(GetUser.roleCode == 1){
          this._router.navigate(['recruiter']);
      }      
      if(GetUser.roleCode == 2){
        this._router.navigate(['candidate']);
      }

    }
    );
  }    
}