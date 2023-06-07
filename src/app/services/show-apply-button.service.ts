import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowApplyButtonService {
  user =
  {
    recIsOnline:false,
    cndIsOnline:false
  }

  RecruiterOnline(){
    return this.user.recIsOnline;
  }
  CandidateOnline(){
    return this.user.cndIsOnline;
  }
}
