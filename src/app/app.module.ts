import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { CandidateComponent } from './candidate/candidate.component';
import { AuthComponent } from './auth/auth.component';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer.component';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { AddJobComponent } from './add-job/add-job.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthTokenInterceptorService } from './services/resolvers/auth-token-interceptor.service';
import { AuthGuardService } from './services/guards/auth-guard.service';


const appRoutes: Routes = [
  // {path: '', component: AppComponent}, //localhost;4200/
  {path: 'auth', component: AuthComponent},
  {path: 'candidate', component: CandidateComponent},
  {path: 'recruiter', component: RecruiterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'offer', 
  component: OfferComponent,
  canActivate: [AuthGuardService]
},
  {path: 'about', component: AboutComponent},
  {path: 'addjob', component: AddJobComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    RecruiterComponent,
    CandidateComponent,
    AuthComponent,
    HomeComponent,
    OfferComponent,
    AboutComponent,
    AddJobComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,  RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthTokenInterceptorService, 
      multi: true 
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
