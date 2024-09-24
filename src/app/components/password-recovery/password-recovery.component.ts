import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [NgClass],
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  focus: any;
  focus1: any;
  constructor() { }

  ngOnInit(): void {
  }

}
