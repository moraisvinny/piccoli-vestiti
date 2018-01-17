import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-area-administrativa',
  templateUrl: './area-administrativa.component.html',
  styleUrls: ['./area-administrativa.component.css']
})
export class AreaAdministrativaComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.usuarioService.logout()
  }

  public isUsuarioLogado: boolean
  constructor(private usuarioService: UsuarioService, private route: Router) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isUsuarioLogado = true
      } else {
        this.isUsuarioLogado = false
      }
    });
  }

  sair() {
    this.usuarioService.logout()
    this.route.navigate(['/login'])
  }

}
