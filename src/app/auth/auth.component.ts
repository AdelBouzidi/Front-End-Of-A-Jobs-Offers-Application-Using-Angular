import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from './user-model';
import { AuthService } from '../services/auth.service';
import { SignupRecruiterModel } from './signupRecruiter-model';
import { SignupCandidateModel } from './signupCandidate-model';
import { AddUsersService } from '../services/add-users.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  @ViewChild('f') signUpForm: NgForm | any;
  @ViewChild('g') signUpForm2: NgForm| any;
  @ViewChild('h') signUpForm3!: NgForm| any;
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
  signUpClicked : boolean = false;
  recDefaultValues: any;
  recValues :any
  cndDefaultValues: any;
  cndValues :any
  condition: boolean = false;
  selectClickedButton: boolean = false;
  signupAS: string = 'candidate';
  errorMessagePassword: boolean =false;
  errorMessagePassword2: boolean =false;
  errorMessageDescription: boolean =false;
  errorMessageDescription2: boolean =false;


  ngOnInit(): void {
    
    this.recDefaultValues = new SignupRecruiterModel();
    this.recDefaultValues.firstname = '';
    this.recDefaultValues.lastname = '';
    this.recDefaultValues.email = '';
    this.recDefaultValues.password = '';
    this.recDefaultValues.phone = '';
    this.recDefaultValues.Description = '';
    this.recDefaultValues.gender = '';

    this.cndDefaultValues = new SignupCandidateModel();
    this.cndDefaultValues.firstname = '';
    this.cndDefaultValues.lastname = '';
    this.cndDefaultValues.email = '';
    this.cndDefaultValues.password = '';
    this.cndDefaultValues.phone = '';
    this.cndDefaultValues.militaryService = '';  //passed
    this.cndDefaultValues.Description = '';
    this.cndDefaultValues.gender = '';
  }
  constructor(private http : HttpClient, private _router: Router,private auth: AuthService, private addUser: AddUsersService ) {    
  }

  onFormSubmit(){
    this.isLoading = true;
    this.email = this.signUpForm.value.email
    this.password = this.signUpForm.value.password;
    this.role = this.signUpForm.value.user; 
    
    this.auth.login(this.email, this.password,  this.role).subscribe(
      (response)=> {

      // console.log(response);
      let GetUser = new UserModel();
      GetUser.userCode = response[0].userCode; 
      GetUser.nbf = response[0].nbf;
      GetUser.roleCode = response[0].roleCode;
      GetUser.exp = response[0].exp; 
      GetUser.iss = response[0].iss; 
      GetUser.aud = response[0].aud; 

      this.auth.userIs.online = true;

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

  signUp(){
    this.signUpClicked = true;
    this.auth.hideButtonLoginAndLogout();
    // this.setValueDefault();
  }

  LoginUp(){
    this.signUpClicked = false;
    this.auth.showButtonLoginAndLogout();
  }

  onFormSubmitRecruiter(){
    this.recValues = new SignupRecruiterModel();
    this.recValues.firstname = this.signUpForm2.value.Firstname;
    this.recValues.lastname = this.signUpForm2.value.Lastname;
    this.recValues.email = this.signUpForm2.value.Email;
    this.recValues.password = this.signUpForm2.value.Password;
    this.recValues.phone = this.signUpForm2.value.Phone;
    this.recValues.Description = this.signUpForm2.value.Description;
    this.recValues.gender = this.signUpForm2.value.Gender;

    if(this.recValues.password.length < 8 || this.recValues.password.length > 30){
      this.errorMessagePassword = true;
    }
    if(this.recValues.Description > 200){
      this.errorMessageDescription=true;
    }
    // console.log(this.recValues);

    this.addUser.addRecruiter(this.recValues.firstname, this.recValues.lastname, this.recValues.email, this.recValues.password, this.recValues.phone, this.recValues.Description, this.recValues.gender)
    .subscribe(Response => {
      console.log(Response);
    });

    // this.signUpForm2.reset();     

  }
  onFormSubmitCandidate(){
    this.cndValues = new SignupCandidateModel();
    this.cndValues.firstname = this.signUpForm3.value.Firstname;
    this.cndValues.lastname = this.signUpForm3.value.Lastname;
    this.cndValues.email = this.signUpForm3.value.Email;
    this.cndValues.password = this.signUpForm3.value.Password;
    this.cndValues.phone = this.signUpForm3.value.Phone;
    this.cndValues.Description = this.signUpForm3.value.Description;
    this.cndValues.gender = this.signUpForm3.value.Gender;

    if(this.signUpForm3.value.MilitaryService == 'passed'){
      this.cndValues.militaryService = true;
    }else{
      this.cndValues.militaryService = false;
    }

    
    console.log(this.cndValues);
    if(this.cndValues.password.length < 8 || this.cndValues.password.length > 30){
      this.errorMessagePassword2 = true;
    }
    if(this.cndValues.Description > 200){
      this.errorMessageDescription2=true;
    }
    this.addUser.addCandidate(this.cndValues.firstname, this.cndValues.lastname, this.cndValues.email, this.cndValues.password, this.cndValues.phone, this.cndValues.militaryService, this.cndValues.Description, this.cndValues.gender)
    .subscribe(Response => {
      console.log(Response);
    });

  }

  onChange() {
    this.condition = true; // Exemple de condition basée sur la valeur sélectionnée
  }

  selectClicked(){
    this.selectClickedButton = true;
    this.signupAS = 'candidate';
  }
}