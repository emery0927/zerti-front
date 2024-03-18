import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-sede',
  templateUrl: './crear-sede.component.html',
  styleUrls: ['./crear-sede.component.css']
})
export class CrearSedeComponent implements OnInit  {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(@Inject(MAT_DIALOG_DATA) public dataColegio:any){}

}
