import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ShowApplyButtonService } from '../services/show-apply-button.service';
import { JobResponse } from '../Job-Response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit{
  jobs: any;
  jobClicked = false;
  appBtn : boolean = false;
  jobFormTemplate : any;
  jobtoSend : JobResponse;


  constructor(private http: HttpClient, private show : ShowApplyButtonService, private _router : Router) {
  }
  ngOnInit(): void {
    if(this.show.CandidateOnline() == true && this.show.RecruiterOnline() == false){
      this.appBtn = true;
    }
    this.getJobs();    
  }

  getJobs(){
    this.http.get('https://localhost:7101/api/Job/GetJob').pipe(map((response :any) => {
      let gets=[];
      console.log(response);
      for(let key in response){ // in not of because it is an object
        gets.push({...response[key], key});
      }
      return gets;
    })).subscribe(response => {
      //  console.log(response);
      //  console.log(response);

      this.jobs = response;
    });
  }

  JobCliked(){
    this.jobClicked= true;
  }
  HideDescription(){
    this.jobClicked= false;
  }

  ShowMoreClicked(job: any){
    this.jobFormTemplate = job;
    // console.log(encodeURIComponent(JSON.stringify(job)));
    this._router.navigate(['/child'], { queryParams: { myData: encodeURIComponent(JSON.stringify(job)) } });
  }

}
