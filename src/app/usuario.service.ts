import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Usuario } from './shared/models/usuario.model';

@Injectable()
export class UsuarioService {

  constructor() { }

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

}
