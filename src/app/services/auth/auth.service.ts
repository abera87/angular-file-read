import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, ObservableInput, of, throwError } from 'rxjs';
import { IUser } from 'src/app/Entities/IUser';
import { config } from 'src/app/config';
import { IAuthResponsePayload } from 'src/app/Entities/IAuthResponsePayload';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);


  get IsLoggedIn() {
    // TODO: uncomment this ti enabel actual login
    // return this.loggedIn.asObservable();
    return of(true);
  }

  constructor(private router: Router, private http: HttpClient) { }

  Login(user: IUser) {

    this.loggedIn.next(true);
    this.router.navigate(['/']);
    return of(null);


    if (user.userName !== '' && user.password !== '') {
      return this.http.post<IAuthResponsePayload>(`${config.API_URL}v1/accounts:signInWithPassword?key=${environment.API_KEY}`,
        {
          email: user.userName,
          password: user.password,
          returnSecureToken: true
        }).pipe(
          map(res => {
            this.loggedIn.next(true);
            this.router.navigate(['/']);
            return res;
          })
          // ,catchError((err): ObservableInput<IAuthResponsePayload> => { 
          //   console.log('error: from auth service');
          //   console.log(err);
          //   return throwError(err) 
          // })
        );
    }
    else {
      throwError('Please provide user name & password');
    }
  }

  Logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/signin']);
  }

  SignUp(user: IUser) {
    return this.http.post<IAuthResponsePayload>(`${config.API_URL}v1/accounts:signUp?key=${environment.API_KEY}`,
      {
        email: user.userName,
        password: user.password,
        returnSecureToken: true
      });
  }
}
