import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { responseRecruiter } from '../responseAddRecruiter';
import { responseCandidate } from '../responseAddCandidate';

@Injectable({
  providedIn: 'root'
})
export class AddUsersService {
  url: string | undefined;
  url1: string | undefined;
  constructor(private http: HttpClient) { }
  addRecruiter(RecruiterFname: string, RecruiterLname: string, RecruiterAdress: string, UserPw: string, RecruiterPhone: string, RecruiterDesc: string, GenderCode: number){
    var  Headers = new HttpHeaders({
      'Content-Type': 'application/json',  
    })
    this.url = 'https://localhost:7101/api/Recruiter/CreateRecruiter';
    return this.http.post(this.url, {RecruiterFname, RecruiterLname, RecruiterAdress, UserPw, RecruiterPhone, RecruiterDesc, GenderCode}, {headers: Headers})
    .pipe(
      map((response : any) => {
      let recruiterRes: responseRecruiter[] = [];
      recruiterRes.push(response);
      return recruiterRes;
    })); 
  }

  addCandidate(CandidateFname: string, CandidateLname: string, CandidateAdress: string, UserPw: string, CandidatePhone: string, CandidateMs: boolean, CandidateDesc: string, GenderCode: number){
    var  Headers = new HttpHeaders({
      'Content-Type': 'application/json',  
    })
    this.url1 = 'https://localhost:7101/api/candidate/CreateCandidate';
    return this.http.post(this.url1, {CandidateFname, CandidateLname, CandidateAdress, UserPw, CandidatePhone,CandidateMs, CandidateDesc, GenderCode}, {headers: Headers})
    .pipe(
      map((response : any) => {
      let candidateRes: responseCandidate[] = [];
      candidateRes.push(response);
      return candidateRes;
    })); 
  }


}
