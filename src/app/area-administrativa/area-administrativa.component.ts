import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-administrativa',
  templateUrl: './area-administrativa.component.html',
  styleUrls: ['./area-administrativa.component.css']
})
export class AreaAdministrativaComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private route: Router) { }

  ngOnInit() {
  }

  sair() {
    this.usuarioService.logout();
    this.route.navigate(['/adm/login'])
  }

}
