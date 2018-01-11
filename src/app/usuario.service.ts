import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Usuario } from './shared/models/usuario.model';
import { CanActivate } from '@angular/router';

@Injectable()
export class UsuarioService implements CanActivate {
  
  constructor() { }

  canActivate(): boolean {
    return null
  }

  incluirUsuarioAdministrativo(usuario: Usuario): Promise<any> {

    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta) => {
        delete usuario.senha
        firebase.database().ref(`usuarios`).push(usuario)
          .then((resposta) => {
            console.log("Usuario criado - " + resposta)
          })
      }).catch((reason) => {
        console.log("Erro no auth: ", reason)
      });
  }

  login(usuario: Usuario): Promise<any> {

    return firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.senha)
      
  }

  logout(): void {
    firebase.auth().signOut()
  }

}
