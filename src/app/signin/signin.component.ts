import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../Entities/IUser';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInFormGroup: FormGroup;
  user: IUser;
  hasError: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.signInFormGroup = this.formBuilder.group({
      userName: new FormControl('a@a.com',
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]),
      password: new FormControl('123456',
        [
          Validators.required,
          Validators.minLength(6)
        ])
    });
  }

  ngOnInit(): void {
  }

  OnSignIn() {
    this.user = {
      userName: this.signInFormGroup.value.userName,
      password: this.signInFormGroup.value.password
    };
    this.authService.Login(this.user).subscribe(
      success => {
        this.hasError = null;

      }
      , err => {
        let errCode: string = err.error.error.message;
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          switch (errCode) {
            case 'EMAIL_NOT_FOUND':
              this.hasError = 'There is no user record corresponding to this email. The user may have been deleted.'
              break;
            case 'INVALID_PASSWORD':
              this.hasError = 'The password is invalid'
              break;
            case 'USER_DISABLED':
              this.hasError = 'The user account has been disabled by an administrator.'
              break;
            default:
              this.hasError = 'Some error occured';
              break;
          }
        }
        else{
          this.hasError=err;
        }
      }
    );

  }

}
