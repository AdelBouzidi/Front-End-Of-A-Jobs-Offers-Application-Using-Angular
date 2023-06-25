import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CandidateRes } from '../Cadidate-response';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(private http: HttpClient) { }

  getCandidateByMail(mail :string){
    let url = 'https://localhost:7101/api/candidate/GetCandidateByMail?mail=';
    let url2 = url.concat(mail.toString());
    return this.http.get(url2).pipe(
      map((response: any) => {
        let candidate : CandidateRes;
        candidate = response;
        return candidate;
      })
    );
  }

  getRecruiterByMail(mail: string){
    let url = 'https://localhost:7101/api/Recruiter/';
    let url2 = url.concat(mail.toString());
    return this.http.get(url2);
  }
}
