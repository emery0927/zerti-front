import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import emailjs  from '@emailjs/browser'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  form!: FormGroup;


  constructor(private fb: FormBuilder) {
  }


  ngOnInit() {
    this.form = this.fb.group({
    from_name: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
    message: ['', [Validators.required,Validators.minLength(3)]],
    email_customer: ['', [Validators.required,Validators.minLength(3), Validators.email]]
  });
  }

  async sendEmail() {
    if (this.form.valid) {
      emailjs.init('z5Gbw5isa0C3JYz2X')
      let response = await emailjs.send("service_x0n5mrb","template_l3149ri",{
        from_name: this.form.value.from_name,
        message: this.form.value.message,
        email_customer: this.form.value.email_customer,
      });
      Swal.fire({
        title: '¡Mensaje Enviado!',
        text: 'El mensaje ha sido enviado con exito y será revisado por uno de nuestros asesores',
        icon: 'success',
        confirmButtonText: 'Listo'
      })
      this.form.reset();
    }
  }



}
