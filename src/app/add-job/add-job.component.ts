import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JobModel } from './job-model';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit{
  @ViewChild('f') jobForm: NgForm | any;
  url : string ='https://localhost:7101/api/JobInfo/';
  body: any;
  Job : JobModel | undefined;
constructor(private _router: Router, private http : HttpClient) {}
  ngOnInit(): void {
    // this.Formulaire();
  // this.body = JSON.stringify(this.Job);
  // this.http.post<JobModel>('https://localhost:7101/api/JobInfo', this.body).subscribe((response : any) => {
  //      console.log(response);
  //   });
  }

  FormSubmit(){
    let JobPost = { 
        JobName: this.jobForm.value.JobName,
        JobDesc: this.jobForm.value.JobDesc,
        JobLevel: this.jobForm.value.JobLevel,
        JobExpDate: this.jobForm.value.ExperationDateJob,
        JobMode: this.jobForm.value.JobMode,
        DomainCode: 'DEV',
        RegionCode:'dz-18',
        RecruiterCode: 'rec-8',
        CtrCode: this. jobForm.value.CtrCode,
        NumberOfPosts: this.jobForm.value.NumberOfPosts,
        YearExperienceRequired: this.jobForm.value.YearExperienceRequired ,
        FrenchLevel: this.jobForm.value.FrenshLevel,
        EnglishLevel: this.jobForm.value.EnglishLevel,
        Graduate: this.jobForm.value.Graduate 
    };
    var  Headers = new HttpHeaders({
      'Content-Type': 'text/json'
    })

  //   this.http.post<JobModel>('https://localhost:7101/api/Job/CreateJob', JobPost,  {headers: Headers}).subscribe((response : any)=> {
  //     console.log(response);
  //  });
  this.http.post('https://localhost:7101/api/Job/CreateJob', JobPost,  {headers: Headers}).subscribe((response : any)=> {
    console.log(response);
 });
  }

  Formulaire(){
    let Job = { 
        JobCode: 'job-33',
        JobName: 'aa',
        JobDesc: 'aaa',
        JobLevel: 'aaaa',
        JobExpDate: new Date(),
        JobMode: 'aaaa',
        DomainCode: 'DBE',
        RegionCode:'dz-18',
        RecruiterCode: 'rec-8',
        CtrCode: 'cdd',
        NumberOfPosts: 1,
        YearExperienceRequired: 2 ,
        FrenchLevel: 'aaaaa',
        EnglishLevel: 'vvvv',
        Graduate: 'rrr'
    };
    this.body = JSON.stringify(Job);
    console.log(this.body);
    var  Headers = new HttpHeaders({
      'Content-Type': 'application/json',  
    })
    // this.http.post<JobModel>('https://localhost:7101/api/JobInfo/createjob', Job,  {headers: headers}).subscribe((response : any)=> {
    //    console.log(response);
    // });
    this.http.post('https://localhost:7101/api/Job/createjob', Job,  {headers: Headers}).subscribe((response : any)=> {
      console.log(response);
   });
  }

  NavigateHomeRec(){
    this._router.navigate(['recruiter']);
  }


}
