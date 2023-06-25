import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileCandidateService } from '../services/profile-candidate.service';
import { AuthService } from '../services/auth.service';
import { GetUserService } from '../services/get-user.service';
import { CandidateRes } from '../Cadidate-response';
import { JobService } from '../services/job.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-offer-child',
  templateUrl: './offer-child.component.html',
  styleUrls: ['./offer-child.component.css']
})
export class OfferChildComponent implements OnInit{
  jsonData: any;
  messageToCreateProfile : string;
  pourcentageVariableLocal : number;
  showMessageError : boolean = false;
  // candidateInfoExist : boolean = false;
  EmailOfCandidateOnline: string;
  candidateCode: number;
  jobCode :number;

  messageHtmlApplySuccess : string = "";
  afficherMessageHtmlApplySuccess : boolean = false; 
  
  messageHtmlApplyError : string = "";
  afficherMessageHtmlApplyError : boolean = false;

  constructor(private route: ActivatedRoute, private profile : ProfileCandidateService, private _router : Router,
    private auth : AuthService,  private GetCnd : GetUserService, private jobService: JobService) {
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const encodedData = params['myData'];
      this.jsonData = JSON.parse(decodeURIComponent(encodedData));
      this.jobCode = this.jsonData.jobCode;
      // console.log(this.jobCode);
      // console.log('Données reçues :', this.jsonData);
    });

    this.auth.EmailOfUserOnline.subscribe(value => {
      this.GetCnd.getCandidateByMail(value).subscribe((cnd: CandidateRes) =>{
        this.candidateCode = cnd.candidateCode!;
      });
    });



    this.profile.pourcentageProfile.subscribe((data: [boolean, boolean, boolean, boolean, number]) => {
      const [formation, experience, skill, preference, pourcentage] = data;
      console.log('Formation:', formation);
      console.log('Experience:', experience);
      console.log('Skill:', skill);
      console.log('Preference:', preference);
      console.log('Pourcentage:', pourcentage);
      this.pourcentageVariableLocal = pourcentage;
      if(!formation && !experience && !skill && !preference && pourcentage == 0){
          this.messageToCreateProfile = "To be able to apply, you must first create your profile (experiences, formations, skills, preferences)";
      }
      if(formation && !experience && !skill && !preference && pourcentage == 25){
        this.messageToCreateProfile = "To be able to apply, you must first complete your profile (You have not entered your experiences and skills and preference yet)";
      }
      if(!formation && experience && !skill && !preference && pourcentage == 25){
        this.messageToCreateProfile = "To be able to apply, you must first complete your profile (You have not entered your formations and skills and preference yet)";
      }
      if(!formation && !experience && skill && !preference && pourcentage == 25){
        this.messageToCreateProfile = "To be able to apply, you must first complete your profile (You have not entered your formations and experiences and preference yet)";
      }
      if(!formation && !experience && !skill && preference && pourcentage == 25){
        this.messageToCreateProfile = "To be able to apply, you must first complete your profile (You have not entered your formations and experiences and skills yet)";
      }
      if(formation && experience && !skill && !preference && pourcentage == 50){
        this.messageToCreateProfile = "To be able to apply, you must first complete your profile (You have not entered your preferences and skills yet)";
      }
      if(formation && !experience && skill && !preference && pourcentage == 50){
        this.messageToCreateProfile = "To be able to apply, you must first complete your profile (You have not entered your preferences and experiences yet)";
      }
      if(formation && !experience && !skill && preference && pourcentage == 50){
        this.messageToCreateProfile = "To be able to apply, you must first complete your profile (You have not entered your experiences and skills yet)";
      }
      if(!formation && experience && skill && !preference && pourcentage == 50){
        this.messageToCreateProfile = "To be able to apply, you must first complete your profile (You have not entered your formations and preferences yet)";
      }
      if(!formation && experience && !skill && preference && pourcentage == 50){
        this.messageToCreateProfile = "To be able to apply, you must first complete your profile (You have not entered your formations and skills yet)";
      }
      if(!formation && !experience && skill && preference && pourcentage == 50){
        this.messageToCreateProfile = "To be able to apply, you must first complete your profile (You have not entered your formations and experiences yet)";
      }
      if(!formation && experience && skill && preference && pourcentage == 75){
        this.messageToCreateProfile = "To be able to apply, you must first complete your profile (You have not entered your formations yet)";
      }
      if(formation && !experience && skill && preference && pourcentage == 75){
        this.messageToCreateProfile = "To be able to apply, you must first complete your profile (You have not entered your experiences yet)";
      }
      if(formation && experience && !skill && preference && pourcentage == 75){
        this.messageToCreateProfile = "To be able to apply, you must first complete your profile (You have not entered your skills yet)";
      }
      if(formation && experience && skill && !preference && pourcentage == 75){
        this.messageToCreateProfile = "To be able to apply, you must first complete your profile (You have not entered your preferences yet)";
      }
    });

  }

  ApplyClicked(){
    if(this.pourcentageVariableLocal < 100){
      this.showMessageError = true;
    }
    var currentDate = new Date();

    this.jobService.apply(this.jobCode ,this.candidateCode, currentDate).subscribe((response:any) => {
      console.log(response);
      if(Object.keys(response).length > 0){
        this.afficherMessageHtmlApplySuccess = true;
        this.messageHtmlApplySuccess =  "you have successfully applied";
      }
    },
    (error: HttpErrorResponse) => {
      this.messageHtmlApplyError = error.error.error;
      this.afficherMessageHtmlApplyError = true;
    }
    );
    setTimeout(() => {
      this.afficherMessageHtmlApplySuccess = false;
    }, 5000); 
    setTimeout(() => {
      this.afficherMessageHtmlApplyError = false;
    }, 5000); 
     
  }
  ClickHereClicked(){
    this._router.navigate(['createProfile']);
  }

}
