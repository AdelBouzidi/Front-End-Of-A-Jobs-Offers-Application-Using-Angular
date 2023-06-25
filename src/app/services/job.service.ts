import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  urlGetJob: string;
  urlGetJobForRecruiter : string;
  urlApply: string;

  constructor(private http: HttpClient) { }

  addJob(JobName:string, JobDesc: string, JobLevel: string, JobExpDate: Date, JobMode: string, DomainCode: number, 
    RegionName: string, RecruiterCode: number, CtrCode: number, NumberOfPosts: number, YearExperienceRequired: number,
    FrenchLevel: string, EnglishLevel: string, Graduate: string){
      var  Headers = new HttpHeaders({
        'Content-Type': 'application/json',  
      })
      this.urlGetJob = 'https://localhost:7101/api/Job/CreateJob';
      return this.http.post(this.urlGetJob, {JobName, JobDesc, JobLevel, JobExpDate, JobMode, DomainCode, RegionName, 
        RecruiterCode, CtrCode, NumberOfPosts, YearExperienceRequired, FrenchLevel, EnglishLevel, Graduate}, 
        {headers: Headers});
  }

  getJobByRecruiterCode(recruiterCode : number){
    this.urlGetJobForRecruiter = 'https://localhost:7101/api/Job/GetJobByRecruiterCode?recruiterCode=';
    let url: string = `${this.urlGetJobForRecruiter}${recruiterCode}`;
    return this.http.get(url).pipe(map((response: any) => {
      const jobs :any[] = [];
      Object.keys(response).forEach((key: string) => {
        const item = response[key];
        const job = {
          jobName: item.jobName,
          jobDesc: item.jobDesc,
          jobLevel: item.jobLevel,
          jobExpDate: new Date(item.jobExpDate),
          jobMode: item.jobMode,
          domainName: item.domainName,
          regionName: item.regionName,
          recruiterCode: item.recruiterCode,
          ctrName: item.ctrName,
          numberOfPosts: item.numberOfPosts,
          yearExperienceRequired: item.yearExperienceRequired,
          frenchLevel: item.frenchLevel,
          englishLevel: item.englishLevel,
          graduate: item.graduate
        };
        jobs.push(job);
      });
      return jobs;
    }));
  }

   apply(JobCode: number, CandidateCode: number, ApplyDate: Date){
    var  Headers = new HttpHeaders({
      'Content-Type': 'application/json',  
    })
    this.urlApply = 'https://localhost:7101/api/profile/Apply';
    return this.http.post(this.urlApply, {JobCode, CandidateCode, ApplyDate},  {headers: Headers});
   }

  
}
