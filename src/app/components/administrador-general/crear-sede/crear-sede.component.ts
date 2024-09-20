import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-crear-sede',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule],
  templateUrl: './crear-sede.component.html',
  styleUrls: ['./crear-sede.component.css']
})
export class CrearSedeComponent implements OnInit  {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(@Inject(MAT_DIALOG_DATA) public dataColegio:any){}

}
