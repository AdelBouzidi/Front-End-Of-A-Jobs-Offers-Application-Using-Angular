import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { UserModel } from '../auth/user-model';
import jwt_decode from 'jwt-decode';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url : string | undefined;
  userSub = new BehaviorSubject<User|null>(null);
  LoginLogoutButton = new BehaviorSubject<boolean|null>(null);
  

  clearTimeout: any;

  userIs =
  {
    online:false,
  }

  constructor(private http: HttpClient,private router: Router) { }
  
  login(email: string, password: string, role: string){
    var  Headers = new HttpHeaders({
      'Content-Type': 'application/json',  
    })
    this.url = 'https://localhost:7101/api/authentiation/authenticate';
    return this.http.post<string>(this.url, {email, password, role},{headers: Headers})
    .pipe(
      map(response => {
      let posts: UserModel[] = [];
      posts.push(jwt_decode(response));
      posts[0].token = response.toString();
      console.log(posts);
      console.log(posts);
      console.log(posts);
      return posts;
    }),
    tap(this.handleUser.bind(this)), catchError(this.getErrorHandler));  
  }
  private handleUser(response: UserModel[]){
     let userName = response[0].userName; 
     let userCode = response[0].userCode;
     let roleCode = response[0].roleCode;
     let exp = response[0].exp; 
     let nbf = response[0].nbf; 
     let token = response[0].token;
     let difference = (parseInt(Number(exp).toString()))-(parseInt(Number(nbf).toString()));
     const expireDate = new Date().getTime()/1000 + +difference;

     const user = new User();
     user.userName = userName;
     user.userCode = userCode;
     user.roleCode = roleCode;
    //  user.expireDate = new Date(expireDate* 1000);
     user.expireDate = expireDate;
     user.token = token;
     this.userSub.next(user);
     this.LoginLogoutButton.next(true);
     localStorage.setItem('userData',JSON.stringify(user)); // JSON.stringify it will convert the object "user" into string.
     this.autoLogout(expireDate);
  }
  getErrorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Error Occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email Already Exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email Not Found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password';
        break;
    }
    return throwError(errorMessage);
  }
  autoLogin() {
    let userData: {
      userName: string;
      userCode: number;
      roleCode: number;
      expireDate: number;
      token: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    if (!userData) {
      return;
    }

    let user = new User();
    user.userName = userData.userName;
    user.userCode = userData.userCode;
    user.roleCode = userData.roleCode;
    user.expireDate = userData.expireDate;
    user.token = userData.token;

    if (user) {
      this.userSub.next(user);
      this.LoginLogoutButton.next(true);
    }

    let date = new Date().getTime()/1000;
    let expirationDate = new Date(userData.expireDate).getTime();
    this.autoLogout(expirationDate - date);
  }

  autoLogout(expirationDate: number){
    this.userIs.online = false;
    console.log(expirationDate); //millee seconds
    this.clearTimeout = setTimeout(() => {
        this.logout();
    }, expirationDate);
  }

  logout(){
    this.userIs.online = false;
    this.userSub.next(null);  
    this.LoginLogoutButton.next(false);
    this.router.navigate(['/auth']);
    // localStorage.clear(); // delete all item of localStorage.
    localStorage.removeItem('userData'); // remove just the Item 'userData'.
    if(this.clearTimeout ){ // bech ki lutilisateur ydir login nhabsou setTimeout ta3 autologout.
        // this.clearTimeout();
        clearTimeout(this.clearTimeout);
    }
} 
isAuthenticated() {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      resolve(this.userIs.online);
      // resolve(true);
    }, 1000);
  });
}
// isOnline(){
//   if(this.isLoggedIn = true){
//     this.LoginLogoutButton.next(true);
//   }else{
//     this.LoginLogoutButton.next(false);
//   }
//   this.stepCode = true
// }
}


