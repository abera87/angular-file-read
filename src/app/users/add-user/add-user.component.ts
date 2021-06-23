import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/Entities/IUser';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addaUserFormGroup: FormGroup;
  user: IUser;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.addaUserFormGroup = this.formBuilder.group({
      userName: new FormControl('',
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6)
        ])
    });
  }

  ngOnInit(): void {
  }

  OnAddUser() {
    this.user = {
      userName: this.addaUserFormGroup.value.userName,
      password: this.addaUserFormGroup.value.password
    };
    this.authService.SignUp(this.user).subscribe(
      res => {
        console.log(res);
        this.addaUserFormGroup.reset();
      },
      err => {
        console.log(err);

      });

  }

}
