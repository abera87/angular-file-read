import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn:Observable<Boolean>;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn=this.authService.IsLoggedIn;
  }

  Logout(){
    this.authService.Logout();
    console.log('logout click');
    
  }

}
