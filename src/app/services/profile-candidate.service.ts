import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ExperienceRes } from '../Experience_response';
import { FormationRes } from '../FormationResponse';
import { SkillRes } from '../Skill-Resonse';
import { PreferenceRes } from '../Preference-Response';

@Injectable({
  providedIn: 'root'
})
export class ProfileCandidateService {
  pourcentageProfile = new BehaviorSubject<[boolean, boolean, boolean, boolean, number]>([false, false, false, false, 0]);

  urlSkill: string;
  urlExp: string;
  urlForm: string;
  urlPref: string;
  constructor(private http: HttpClient) {}

  getExperienceCandidate(mail :string){
    let url = 'https://localhost:7101/api/candidate/GetExpByMail?mail=';
    let url2 = url.concat(mail.toString());
    return this.http.get(url2).pipe(
      map((response: any) => {
        let exp: ExperienceRes[] = response.map((item: any) => {
          return {
            expName: item.expName,
            expDesc: item.expDesc,
            expCompany: item.expCompany,
            expInProg: item.expInProg,
            expSdate: new Date(item.expSdate),
            expEdate: new Date(item.expEdate),
            skillName: item.skillName,
            domainName: item.domainName,
            countryName: item.countryName,
            regionName: item.regionName,
          };
        });
        // console.log(exp);
        return exp;
      })
    );
  }

  getFormationCandidate(mail :string){
    let url = 'https://localhost:7101/api/candidate/GetFormByMail?mail=';
    let url2 = url.concat(mail.toString());
    return this.http.get(url2).pipe(
      map((response: any) => {
        let form: FormationRes[] = response.map((item: any) => {
          return {
            formGrad: item.formGrad,
            formName: item.formName,
            formDesc: item.formDesc,
            schoolName: item.schoolName,
            formInProg: item.formInProg,
            formSdate: new Date(item.formSdate),
            formEdate: new Date(item.formEdate),
            countryName: item.countryName,
            regionName: item.regionName,
          };
        });
        return form;
      })
    );
  }


  getSkillCandidate(mail :string){
    let url = 'https://localhost:7101/api/candidate/GetSkillByMail?mail=';
    let url2 = url.concat(mail.toString());
    return this.http.get(url2).pipe(
      map((response: any) => {
        let skill: SkillRes[] = response.map((item: any) => {
          return {
            skillName: item.skillName,
            skillDesc: item.skillDesc,
            skillLevel: item.skillLevel,
          };
        });
        return skill;
      })
    );
  }

  getPreferenceCandidate(mail :string){
    let url = 'https://localhost:7101/api/candidate/GetPreferenceByMail?mail=';
    let url2 = url.concat(mail.toString());
    return this.http.get(url2).pipe(
      map((response: any) => {
        let skill : PreferenceRes;
        skill = response;
        return skill;
      })
    );
  }

  getProfileCandidate(mail :string){
    let url = 'https://localhost:7101/api/profile/GetProfileByMail?mail=';
    let url2 = url.concat(mail.toString());
    return this.http.get(url2).pipe(
      map((response: any) => {
        let skill: SkillRes[] = response.skillProfile.map((item: any) => {
          return {
            skillName: item.skillName,
            skillDesc: item.skillDesc,
            skillLevel: item.skillLevel,
          };
        });

        let exp: ExperienceRes[] = response.experienceProfile.map((item: any) => {
          return {
            expName: item.expName,
            expDesc: item.expDesc,
            expCompany: item.expCompany,
            expInProg: item.expInProg,
            expSdate: new Date(item.expSdate),
            expEdate: new Date(item.expEdate),
            skillName: item.skillName,
            domainName: item.domainName,
            countryName: item.countryName,
            regionName: item.regionName,
          };
        });

        let form : FormationRes[] = response.formationProfile.map((item: any) => {
          return {
            formGrad: item.formGrad,
            formName: item.formName,
            formDesc: item.formDesc,
            schoolName: item.schoolName,
            formInProg: item.formInProg,
            formSdate: new Date(item.formSdate),
            formEdate: new Date(item.formEdate),
            countryName: item.countryName,
            regionName: item.regionName,
          };
        });

        let pref : PreferenceRes;
        pref = response.preferenceProfile;
        let pourcentage = response.pourcentageProfile;

        return [form, pref, exp, skill, pourcentage];
      })
    );;
  }

  profileState(pourcentage : number, formation: boolean, experience: boolean, skill: boolean, preference : boolean){
    this.pourcentageProfile.next([formation, experience, skill, preference, pourcentage]);
  }

  addSkill(SkillName : string, SkillDesc: string, CandidateCode: number, SkillLevel: string){
    var  Headers = new HttpHeaders({
      'Content-Type': 'application/json',  
    })
    this.urlSkill = 'https://localhost:7101/api/profile/CreateSkill';
    return this.http.post(this.urlSkill, {SkillName, SkillDesc, CandidateCode, SkillLevel}, {headers: Headers});
  }


  getAllSkills(){
    let url = 'https://localhost:7101/api/profile/GetAllSkills';
    return this.http.get(url);
  }

  getAllDomain(){
    let url = 'https://localhost:7101/api/profile/GetAllDomains';
    return this.http.get(url);
  }

  getAllCountries(){
    let url = 'https://localhost:7101/api/profile/GetAllCountries';
    return this.http.get(url);
  }
  
  getAllRegions(countryName : string){
    let url = 'https://localhost:7101/api/profile/GetAllRegions?countryName=';
    let url2 = url.concat(countryName.toString());
    return this.http.get(url2);
  }

  addExperience(ExpName: string, ExpDesc: string, ExpCompany: string, ExpInProg : boolean, ExpSdate: Date, ExpEdate: Date, 
    CandidateCode: number, SkillName: string, DomainName: string, CountryName: string, RegionName: string){
    var  Headers = new HttpHeaders({
      'Content-Type': 'application/json',  
    })
    this.urlExp = 'https://localhost:7101/api/profile/CreateExperience';
    return this.http.post(this.urlExp, {ExpName, ExpDesc, ExpCompany, ExpInProg, ExpSdate, ExpEdate, CandidateCode, 
      SkillName, DomainName, CountryName, RegionName}, {headers: Headers});
  }

  addFormation(FormGrad: string, FormName: string, FormDesc : string, SchoolName: string, FormInProg: boolean,
    FormSdate: Date, FormEdate: Date, CandidateCode: number, CountryName: string, RegionName: string){
    var  Headers = new HttpHeaders({
      'Content-Type': 'application/json',  
    })
    this.urlForm = 'https://localhost:7101/api/profile/CreateFormation';
    return this.http.post(this.urlForm, {FormGrad, FormName, FormDesc, SchoolName, FormInProg, FormSdate, FormEdate,
      CandidateCode, CountryName, RegionName}, {headers: Headers});
  }

  addPreference(DesiredSalary: number, PrefMobility: string, CtrName: string, CandidateCode: number, DomainName: string){
    var  Headers = new HttpHeaders({
      'Content-Type': 'application/json',  
    })
    this.urlPref = 'https://localhost:7101/api/profile/CreatePreference';
    return this.http.post(this.urlPref, {DesiredSalary, PrefMobility, CtrName, CandidateCode, DomainName}, {headers: Headers});
  }
}
