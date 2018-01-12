import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Usuario } from './shared/models/usuario.model';
import { CanActivate } from '@angular/router';


@Injectable()
export class UsuarioService implements CanActivate {

  public tokenId: string
  public perfilUsuario: string
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

    return firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.senha).then((resposta)=>{
      
      firebase.auth().currentUser.getIdToken().then((idToken)=>{
        

        firebase.database().ref()
        .child('usuarios')
        .orderByChild('email')
        .equalTo(usuario.email).once('value').then((snapshot) => {

          snapshot.forEach((childSnapshot: any) => {
            
            this.tokenId = idToken
            this.perfilUsuario = childSnapshot.val().perfil
            sessionStorage.setItem("idTokenPiccoli", idToken)
            sessionStorage.setItem("perfilPiccoli", childSnapshot.val().perfil)

          })
        }) 
      })
      
    })

  }

  logout(): void {
    firebase.auth().signOut()
  }

  isUsuarioLogadoAdm(): boolean {
    
    if(this.perfilUsuario == undefined && sessionStorage.getItem("perfilPiccoli") != null){
      this.perfilUsuario = sessionStorage.getItem("perfilPiccoli")
    }

    return this.perfilUsuario === 'ADM'
  }

}
