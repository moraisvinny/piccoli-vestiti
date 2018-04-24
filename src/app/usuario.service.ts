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
      })
  }

  login(usuario: Usuario): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.senha)

  }

  logout(): void {
    firebase.auth().signOut()
  }

  isUsuarioLogadoAdm(): Promise<boolean> {

    let perfilUsuario = undefined

    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {

        firebase.database().ref()
          .child('usuarios')
          .orderByChild('email')
          .equalTo(firebase.auth().currentUser.email).once('value').then((snapshot) => {

            snapshot.forEach((childSnapshot: any) => {

              perfilUsuario = childSnapshot.val().perfil
              resolve(perfilUsuario === 'ADM')
            })
          })
      } else {
        reject("Sem usuário logado")
      }
    })
  }
}
