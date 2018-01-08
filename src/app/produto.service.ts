import { Injectable } from '@angular/core';
import { Produto } from './shared/models/produto-model';
import * as firebase from 'firebase';

@Injectable()
export class ProdutoService {

  constructor() { }

  public incluir(produto: Produto, callback): void {
    console.log("Cheguei no service")
    firebase.database().ref('produtos').push(produto, callback)
  }

}
