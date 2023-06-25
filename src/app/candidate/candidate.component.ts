import { Component, OnInit } from '@angular/core';
import { ShowApplyButtonService } from '../services/show-apply-button.service';
import { Subject, takeWhile } from 'rxjs';
import { ShowLoginLogoutButtonService } from '../services/show-login-logout-button.service';
import { ProfileCandidateService } from '../services/profile-candidate.service';
import { ExperienceRes } from '../Experience_response';
import { AuthService } from '../services/auth.service';
import { FormationRes } from '../FormationResponse';
import { GetUserService } from '../services/get-user.service';
import { CandidateRes } from '../Cadidate-response';
import { SkillRes } from '../Skill-Resonse';
import { PreferenceRes } from '../Preference-Response';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit{
  experiences :  ExperienceRes[] | any;
  formations :  FormationRes[] | any;
  candidateInfos : CandidateRes| any;
  skills : SkillRes[] | any;
  pourcentage : number;
  preferences : PreferenceRes;
  noExperience : boolean = false;
  noFormation : boolean = false;
  showDescription : boolean =false;
  ArrivalEmail : Boolean = false;
  desiredSalary : string = '';
  prefMobility : string | undefined;
  ctrName : string | undefined;
  domainName : string | undefined;

  candidateCode: number | undefined;
  candidateFname: string | undefined;
  candidateLname: string | undefined;
  candidateAdress: string | undefined;
  candidatePhone: boolean | undefined;
  candidateMs: boolean | undefined;
  candidateDesc: string | undefined;
  genderCode: number | undefined;
  userCode: number | undefined;


  formationExist : boolean = false;
  experienceExist : boolean = false;
  skillExist: boolean = false;
  preferenceExiste : boolean = false;




  constructor(private show : ShowApplyButtonService,private auth :AuthService, private showbtn: ShowLoginLogoutButtonService, 
    private profile: ProfileCandidateService, private GetCnd : GetUserService) {
  }
  ngOnInit(): void {

    // this.profile.getProfileCandidate('candidate.05@gmail.com').subscribe((response :any) => {
    //   this.formations = response[0];
    //   console.log(this.formations);
    // })
    this.show.user.cndIsOnline = true;
    this.show.user.recIsOnline = false;

    this.auth.EmailOfUserOnline.subscribe(value => {

  
      this.GetCnd.getCandidateByMail(value).subscribe((cnd: CandidateRes) =>{
        this.candidateCode = cnd.candidateCode;
        this.candidateFname = cnd.candidateFname;
        this.candidateLname = cnd.candidateLname;
        this.candidateAdress = cnd.candidateAdress;
        this.candidatePhone = cnd.candidatePhone;
        this.candidateMs = cnd.candidateMs;
        this.candidateDesc = cnd.candidateDesc;
        this.genderCode = cnd.genderCode;
        this.userCode = cnd.userCode;
        // if (cnd){
        //   this.candidateInfoExist = true;
        //   console.log('candidate existe');
        // }
      });

      this.profile.getProfileCandidate(value).subscribe((response : any) => {
        this.formations = response[0];
        this.preferences = response[1];
        this.experiences = response[2];
        this.skills = response[3];
        this.pourcentage = response[4];

        // this.desiredSalary = this.preferences.desiredSalary;
        // this.desiredSalary =  response[1].desiredSalary;
        if (response[1] && response[1].desiredSalary) {
          this.desiredSalary = response[1].desiredSalary;
        }
        if (response[1] && response[1].prefMobility) {
          this.prefMobility = response[1].prefMobility;
        }
        // this.prefMobility = this.preferences.prefMobility;
        if (response[1] && response[1].ctrName) {
          this.ctrName = response[1].ctrName;
        }
        // this.ctrName = this.preferences.ctrName;
        if (response[1] && response[1].domainName) {
          this.domainName = response[1].domainName;
        }
        // this.domainName = this.preferences.domainName;

        if (this.skills && this.skills.length > 0){
          this.skillExist = true;
        }
        if (this.experiences && this.experiences.length > 0){
          this.experienceExist = true;
        }
        if (this.formations && this.formations.length > 0){
          this.formationExist = true;
        }
        if (this.preferences){
          this.preferenceExiste = true;
        }
        this.profile.profileState(this.pourcentage, this.formationExist, this.experienceExist, this.skillExist, this.preferenceExiste);
      });

      
    });


    

  }

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }


}


