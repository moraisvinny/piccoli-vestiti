import { Injectable } from '@angular/core';
import { Produto } from './shared/models/produto-model';
import * as firebase from 'firebase';

@Injectable()
export class ProdutoService {

  constructor() { }

  public incluir(produto: Produto, callback): void {
    console.log("Cheguei no service")

    try {
      
      firebase.database().ref('produtos').push(null)
        .then((result: any) => {

          console.log("registro inserido com o id: " + result.key);
          // incluir imagem
          let ref = firebase.storage().ref()

          produto.imagens.forEach((imagem: File, indice) => {
            // Cria um filho no root com o id do registro criado no banco
            ref.child(`produtos/imagens/${result.key}/${imagem.name}`)
              .put(imagem).then((snapshot) => {
                console.log("Arquivo salvo " + snapshot);

              }).catch((reason) => {
                console.log("erro ao salvar o arquivo" + reason);
                throw(reason)
              })
          })

        })
    } catch (err) {
      console.log("erro ao salvar o produto - " + err)
      callback(err)
    }

  }

}
