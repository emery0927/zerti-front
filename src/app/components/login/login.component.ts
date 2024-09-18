import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus: any;
  focus1: any;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/home']);
  }
}

