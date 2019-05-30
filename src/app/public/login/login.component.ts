import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(public _title: Title, private router: Router,
              private authService: AuthService) {
    this._title.setTitle('Login');
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.router.navigate(['/admin']);
    // this.authService.login(this.loginForm.value).subscribe(res => {
    //   console.log(res);
    //   this.router.navigate(['/admin']);
    // });
  }

  getErrorMessage() {
    return ' Campo requerido ';
  }

}
