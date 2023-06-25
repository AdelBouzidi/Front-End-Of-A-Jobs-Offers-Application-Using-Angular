import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GetUserService } from '../services/get-user.service';
import { CandidateRes } from '../Cadidate-response';
import { ProfileCandidateService } from '../services/profile-candidate.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit{
  // candidateInfoExist : boolean = false;
  pourcentageVariableLocal : number;
  experienceExist: boolean = false;
  formationExist : boolean = false;
  preferenceExist : boolean = false;
  skillExist : boolean = false;
  showRemark : boolean = true;
  showRemarkSkill : boolean = true;
  showRemarkSkill2 : boolean = true;
  showRemarkExp : boolean = true;
  showRemarkForm : boolean = true;
  showRemarkPref : boolean = true;

  candidateCode: number | undefined;
  candidateFname: string | undefined;
  candidateLname: string | undefined;
  candidateAdress: string | undefined;
  candidatePhone: boolean | undefined;
  candidateMs: boolean | undefined;
  candidateDesc: string | undefined;
  genderCode: number | undefined;
  userCode: number | undefined;

  afficherGrandeCarte: boolean = false;
  afficherGrandeCarte2: boolean = false;
  afficherGrandeCarte3: boolean = false;
  afficherGrandeCarte4: boolean = false;

  @ViewChild('f') signUpForm: NgForm | any;
  @ViewChild('g') signUpForm2: NgForm | any;
  @ViewChild('h') signUpForm3: NgForm | any;
  @ViewChild('r') signUpForm4: NgForm | any;
  @ViewChild('p') signUpForm5: NgForm | any;




  skillNotFoundIndList : boolean = false;
  messageHtmlSkillSuccess : string = "";
  afficherMessageHtmlSkillSuccess : boolean = false;

  skills: any;
  skillNames: string[] = [];

  domains: any
  domainNames: string[] = [];

  countries: any
  countryNames: string[] = [];

  regions: any
  regionNames: string[] = [];

  COUNTRY: string = "Algeria";
  COUNTRY_Form: string = "Algeria";

  expInProg : boolean;
  formInProg : boolean = false;

  messageHtmlExperienceSuccess : string = "";
  afficherMessageHtmlExperienceSuccess : boolean = false;

  messageHtmlFormationSuccess : string = "";
  afficherMessageHtmlFormationSuccess : boolean = false;

  ResetPreference : boolean = false;

  messageHtmlPreferenceSuccess : string = "";
  afficherMessageHtmlPreferenceSuccess : boolean = false;

  constructor(private auth : AuthService,  private GetCnd : GetUserService, private profile: ProfileCandidateService) {    
  }
  ngOnInit(): void {

    this.profile.getAllDomain().subscribe((response :any) => {
      this.domains = response;
      this.domains.forEach((item :any) => {
      this.domainNames.push(item.domainName);
      });
    // console.log(this.domainNames);
    });

    this.profile.getAllCountries().subscribe((response :any) => {
      this.countries = response;
      this.countries.forEach((item :any) => {
      this.countryNames.push(item.countryName);
      });
    // console.log(this.countryNames);
    });

    this.profile.getAllRegions(this.COUNTRY).subscribe((response :any) => {
      this.regions = response;
      this.regions.forEach((item :any) => {
      this.regionNames.push(item.regionName);
      });
    // console.log(this.countryNames);
    });


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
      this.experienceExist = experience;
      this.formationExist = formation;
      this.preferenceExist = preference;
      this.skillExist = skill;
      if(this.preferenceExist){
        this.ResetPreference = true;
      }else{
        this.ResetPreference = false;
      }
    });
  }

  
  afficherCarte() {
    this.afficherGrandeCarte = true;

    // dertha hna thani parce que loukan najoutiw skill w mandiroulouch get skill hna yafficher gga3 ls skill apart les skill li 
    // ajoutahom lutlisteur f la session ta3ou mais hakda juste ydakhal skill apres yrouh yaftah la card ta3 exp rah nrecupirou ge3 
    // les skill w naffichouhmlou f la liste ta3 formuaire ta3 experience :
    this.profile.getAllSkills().subscribe((response :any) => {
      this.skills = response;
      this.skills.forEach((item :any) => {
      this.skillNames.push(item.skillName);
      });
    console.log(this.skillNames);
    });
  }

  HideCarte(){
    this.afficherGrandeCarte = false;
  }
  afficherCarte2() {
    this.afficherGrandeCarte2 = true;
  }

  HideCarte2(){
    this.afficherGrandeCarte2 = false;
  }
  afficherCarte3() {
    this.afficherGrandeCarte3 = true;
  }

  HideCarte3(){
    this.afficherGrandeCarte3 = false;
  }
  afficherCarte4() {
    this.afficherGrandeCarte4 = true;
  }

  HideCarte4(){
    this.afficherGrandeCarte4 = false;
  }

  onFormSubmit(){
    this.profile.addSkill(this.signUpForm.value.SkillNameList,'description provisoire', this.candidateCode!, 
    this.signUpForm.value.SkillLevel).subscribe((response:any) => {
      console.log(response);
      if(Object.keys(response).length > 0){
        this.messageHtmlSkillSuccess = "successfully inserted";
        this.afficherMessageHtmlSkillSuccess = true;
        setTimeout(() => {
          this.showRemarkSkill = false;
        }, 3000); 
        if(!this.skillExist){
            this.pourcentageVariableLocal = this.pourcentageVariableLocal + 25;
        }
      }
    });

    setTimeout(() => {
      this.afficherMessageHtmlSkillSuccess = false;
    }, 5000); // 3000 ms = 3 secondes


    this.profile.getAllSkills().subscribe((response :any) => {
        this.skills = response;
        this.skills.forEach((item :any) => {
        this.skillNames.push(item.skillName);
        });
      console.log(this.skillNames);
    });
  }
  onFormSubmit2(){
    
    // console.log(this.signUpForm2.value.skill);
    // console.log(this.signUpForm2.value.Description);  
    // console.log(this.signUpForm2.value.SkillLevell);
    this.profile.addSkill(this.signUpForm2.value.skill,this.signUpForm2.value.Description, this.candidateCode!, 
    this.signUpForm2.value.SkillLevell).subscribe((response:any) => {
      console.log(response);
      if(Object.keys(response).length > 0){
        this.messageHtmlSkillSuccess = "successfully inserted";
        this.afficherMessageHtmlSkillSuccess = true;
        setTimeout(() => {
          this.showRemarkSkill2 = false;
        }, 3000); 
        this.pourcentageVariableLocal = this.pourcentageVariableLocal + 25;
      }
    });
    setTimeout(() => {
      this.afficherMessageHtmlSkillSuccess = false;
    }, 6000); // 3000 ms = 3 secondes

  }
  AddOthersSkillsClicked(){
    this.skillNotFoundIndList = true;
  }

  onFormSubmit3(){
    if(this.signUpForm3.value.expInProg == "1"){
      this.expInProg = true;
    }else{
      this.expInProg = false;
    }
    this.profile.addExperience(this.signUpForm3.value.Exp, this.signUpForm3.value.Description, this.signUpForm3.value.ExpCampany,
      this.expInProg, new Date(this.signUpForm3.value.ExpSdate), new Date(this.signUpForm3.value.ExpEdate), this.candidateCode!,
      this.signUpForm3.value.SkillName, this.signUpForm3.value.domainName, this.signUpForm3.value.countryName,
      this.signUpForm3.value.regionName).subscribe((response : any) => {
        console.log(response);
        if(Object.keys(response).length > 0){
          this.messageHtmlExperienceSuccess = "successfully inserted";
          this.afficherMessageHtmlExperienceSuccess = true;
          setTimeout(() => {
            this.showRemarkExp = false;
          }, 3000); 
          if(!this.experienceExist){
            this.pourcentageVariableLocal = this.pourcentageVariableLocal + 25;
          }
        }
      });
      setTimeout(() => {
        this.afficherMessageHtmlExperienceSuccess = false;
      }, 6000); // 3000 ms = 3 secondes

  }

  GetRegion() {
    this.profile.getAllRegions(this.COUNTRY).subscribe((response :any) => {
      this.regionNames = [];
      this.regions = response;
      this.regions.forEach((item :any) => {
      this.regionNames.push(item.regionName);
      });
    // console.log(this.countryNames);
    });
  }

  GetRegionForm(){
    this.profile.getAllRegions(this.COUNTRY_Form).subscribe((response :any) => {
      this.regionNames = [];
      this.regions = response;
      this.regions.forEach((item :any) => {
      this.regionNames.push(item.regionName);
      });
    // console.log(this.countryNames);
    });
  }

  onFormSubmit4(){
    if(this.signUpForm4.value.FormInProg == "1"){
      this.formInProg = true;
    }else{
      this.formInProg = false;
    }
    this.profile.addFormation(
      this.signUpForm4.value.FormGrad,
      this.signUpForm4.value.FormName,
      this.signUpForm4.value.FormDesc,
      this.signUpForm4.value.SchoolName,
      this.formInProg,
      new Date(this.signUpForm4.value.FormSdate),
      new Date(this.signUpForm4.value.FormEdate),
      this.candidateCode!,
      this.signUpForm4.value.countryName,
      this.signUpForm4.value.regionName
    ).subscribe((response:any) => {
        console.log(response);
        if(Object.keys(response).length > 0){
          this.messageHtmlFormationSuccess = "successfully inserted";
          this.afficherMessageHtmlFormationSuccess = true;
          setTimeout(() => {
            this.showRemarkForm = false;
          }, 3000); 
          if(!this.formationExist){
            this.pourcentageVariableLocal = this.pourcentageVariableLocal + 25;
          }
        }
      });
      
      setTimeout(() => {
        this.afficherMessageHtmlFormationSuccess = false;
      }, 6000); 
  }

  onFormSubmit5(){
    // console.log(this.signUpForm5.value.DesiredSalary);
    // console.log(this.signUpForm5.value.PrefMobility);
    // console.log(this.signUpForm5.value.CtrName);
    // console.log(this.signUpForm5.value.domainName);

    this.profile.addPreference(Number(this.signUpForm5.value.DesiredSalary), 
      this.signUpForm5.value.PrefMobility,
      this.signUpForm5.value.CtrName,
      this.candidateCode!,
      this.signUpForm5.value.domainName).subscribe((response:any) => {
        console.log(response);
        if(Object.keys(response).length > 0){
          this.messageHtmlPreferenceSuccess = "successfully inserted";
          this.afficherMessageHtmlPreferenceSuccess = true;

          setTimeout(() => {
            this.showRemarkPref = false;
          }, 3000); 

          if(!this.preferenceExist){
            this.pourcentageVariableLocal = this.pourcentageVariableLocal + 25;
          }
        }
      });
      setTimeout(() => {
        this.afficherMessageHtmlPreferenceSuccess = false;
      }, 6000); 
  }
}
