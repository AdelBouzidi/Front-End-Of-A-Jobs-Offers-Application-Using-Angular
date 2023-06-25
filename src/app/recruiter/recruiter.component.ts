import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ShowApplyButtonService } from '../services/show-apply-button.service';
import { Subject } from 'rxjs';
import { ShowLoginLogoutButtonService } from '../services/show-login-logout-button.service';
import { NgForm } from '@angular/forms';
import { JobModel } from '../add-job/job-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileCandidateService } from '../services/profile-candidate.service';
import { GetUserService } from '../services/get-user.service';
import { AuthService } from '../services/auth.service';
import { JobService } from '../services/job.service';


@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit{
  jobAdded: boolean = false;
  afficherGrandeCarte4 : boolean = false;
  afficherGrandeCarte5 : boolean = false;

  @ViewChild('f') jobForm: NgForm | any;
  body: any;
  Job : JobModel | undefined;
  domains: any
  domainNames: string[] = [];

  recruiterCode: number;
  recruiterFname: string;
  recruiterLname : string;
  recruiterAdress : string;
  recruiterPhone : string;

  domainCode : number;

  regions: any
  regionNames: string[] = [];

  countries: any
  countryNames: string[] = [];

  COUNTRY: string = "Algeria";

  messageHtmlJobSuccess : string = "";
  afficherMessageHtmlJobSuccess : boolean = false;

  jobs :any[] = [];

  constructor(private auth :AuthService, private getRec: GetUserService, private profile: ProfileCandidateService, 
    private http : HttpClient, private _router: Router, private show : ShowApplyButtonService, 
    private showbtn: ShowLoginLogoutButtonService, private jobService: JobService) {
  }
  ngOnInit(): void {
    // this.showbtn.recSubject.next(true);
    this.show.user.cndIsOnline = false;
    this.show.user.recIsOnline = true;
    // console.log(this.show.CandidateOnline());

    this.auth.EmailOfUserOnline.subscribe(val => {
      console.log(val);
      this.getRec.getRecruiterByMail(val).subscribe((response:any) => {
        console.log(response.recruiterFname);
        this.recruiterFname = response.recruiterFname
        this.recruiterLname = response.recruiterLname;
        this.recruiterAdress = response.recruiterAdress;
        this.recruiterPhone = response.recruiterPhone;
        this.recruiterCode = response.recruiterCode;
        this.jobService.getJobByRecruiterCode(this.recruiterCode).subscribe((response:any) => {
          this.jobs = response;
          // console.log(this.jobs[0]);
        })
      });

    })
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
   

    this.profile.getAllDomain().subscribe((response :any) => {
      this.domains = response;
      this.domains.forEach((item :any) => {
      this.domainNames.push(item.domainName);
      });
    // console.log(this.domainNames);
    });


    // this.jobService.getJobByRecruiterCode(this.recruiterCode).subscribe((response:any) => {
    //   console.log(response);
    // }) ki derna hakda jaat error parceque recruiterCode y9der ykoun mzl majach ki angular ykoun ytriti f hadi la methode nrmlm donc rah ndir condition li hia (tendar hadi la methode ki ycoun recruiter connectaa) ::
   
    

  }
  AddJob(){
    this.jobAdded = true;
    this._router.navigate(['addjob']);
  }

  afficherCarte4() {
    this.afficherGrandeCarte4 = true;
  }
  HideCarte4(){
    this.afficherGrandeCarte4 = false;
  }
  afficherCarte5() {
    this.afficherGrandeCarte5 = true;
  }
  HideCarte5(){
    this.afficherGrandeCarte5 = false;
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

  FormSubmit(){
    if(this.jobForm.value.domainName == 'IA'){
      this.domainCode = 1;
    }
    if(this.jobForm.value.domainName == 'Dev_FE'){
      this.domainCode = 2;
    }
    if(this.jobForm.value.domainName == 'Dev_BE'){
      this.domainCode = 3;
    }
    if(this.jobForm.value.domainName == 'réseaux et sécurité'){
      this.domainCode = 4;
    }
    if(this.jobForm.value.domainName == 'Designer'){
      this.domainCode = 5;
    }
    if(this.jobForm.value.domainName == 'Graphiste'){
      this.domainCode = 6;
    }
    if(this.jobForm.value.domainName == 'Technico-Commercial'){
      this.domainCode = 8;
    }
    if(this.jobForm.value.domainName == 'Admin_BDD'){
      this.domainCode = 9;
    }
    if(this.jobForm.value.domainName == 'Dev_Ops'){
      this.domainCode = 10;
    }
    if(this.jobForm.value.domainName == 'Sys_Admin'){
      this.domainCode = 11;
    }
    console.log(this.jobForm.value.JobName);
    console.log(this.jobForm.value.JobDesc);
    console.log(this.jobForm.value.JobLevel);
    console.log(this.jobForm.value.ExperationDateJob);
    console.log(this.jobForm.value.JobMode);
    console.log(this.domainCode);
    console.log(this.jobForm.value.regionName);
    console.log(this.jobForm.value.CtrCode);
    console.log(this.jobForm.value.NumberOfPosts);
    console.log(this.jobForm.value.YearExperienceRequired);
    console.log(this.jobForm.value.FrenshLevel);
    console.log(this.jobForm.value.EnglishLevel);
    console.log(this.jobForm.value.Graduate);
    this.jobService.addJob(this.jobForm.value.JobName,
      this.jobForm.value.JobDesc,
      this.jobForm.value.JobLevel,
      new Date(this.jobForm.value.ExperationDateJob),
      this.jobForm.value.JobMode,
      this.domainCode,
      this.jobForm.value.regionName,
      this.recruiterCode,
      this.jobForm.value.CtrCode,
      this.jobForm.value.NumberOfPosts,
      this.jobForm.value.YearExperienceRequired,
      this.jobForm.value.FrenshLevel,
      this.jobForm.value.EnglishLevel,
      this.jobForm.value.Graduate).subscribe((response:any) => {
      console.log(response);
      if(Object.keys(response).length > 0){
        this.messageHtmlJobSuccess = "successfully inserted";
        this.afficherMessageHtmlJobSuccess = true;
        setTimeout(() => {
          this.afficherMessageHtmlJobSuccess = false;
        }, 6000); 
      }
    })
    
    // 3000 ms = 3 secondes
//     let JobPost = { 
//         JobName: this.jobForm.value.JobName,
//         JobDesc: this.jobForm.value.JobDesc,
//         JobLevel: this.jobForm.value.JobLevel,
//         JobExpDate: this.jobForm.value.ExperationDateJob,
//         JobMode: this.jobForm.value.JobMode,
//         DomainCode: 'DEV',
//         RegionCode:'dz-18',
//         RecruiterCode: 'rec-8',
//         CtrCode: this. jobForm.value.CtrCode,
//         NumberOfPosts: this.jobForm.value.NumberOfPosts,
//         YearExperienceRequired: this.jobForm.value.YearExperienceRequired ,
//         FrenchLevel: this.jobForm.value.FrenshLevel,
//         EnglishLevel: this.jobForm.value.EnglishLevel,
//         Graduate: this.jobForm.value.Graduate 
//     };
//     var  Headers = new HttpHeaders({
//       'Content-Type': 'text/json'
//     })

//   //   this.http.post<JobModel>('https://localhost:7101/api/Job/CreateJob', JobPost,  {headers: Headers}).subscribe((response : any)=> {
//   //     console.log(response);
//   //  });
//   this.http.post('https://localhost:7101/api/Job/CreateJob', JobPost,  {headers: Headers}).subscribe((response : any)=> {
//     console.log(response);
//  });





  }
}



