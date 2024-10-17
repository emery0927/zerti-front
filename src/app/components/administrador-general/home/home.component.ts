import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    const uuid = this.authService.getUuid();
    this.cargarUsuario(uuid)
  }

  cargarUsuario(uuid: string): void {
    this.authService.cargarUsuario(uuid).subscribe({
      next: (usuario) => {
        console.log(usuario);
        const usuarioEnSesion = new Usuario(
          usuario.username,
          usuario.first_name,
          usuario.last_name,
          usuario.email
        )
        this.usuarioService.setUsuario(usuarioEnSesion);
      },
      error: (err) => {
        console.error(err);
      }
    })

  }

}
