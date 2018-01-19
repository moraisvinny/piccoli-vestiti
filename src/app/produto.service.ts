import { Injectable } from '@angular/core';
import { Produto } from './shared/models/produto-model';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProdutoService {

  constructor() { }

  public incluir(produto: Produto): Promise<any> {
    delete produto.id
    delete produto.imagens

    return new Promise((resolve, reject) => {

      try {
        firebase.database().ref('produtos').push(produto)
          .then((result: any) => {

            // incluir imagem
            let ref = firebase.storage().ref()

            if (produto.files.length > 0) {

              produto.files.forEach((imagem: File, indice) => {
                // Cria um filho no root com o id do registro criado no banco
                ref.child(`produtos/${result.key}/imagens/img_${indice}`)
                  .put(imagem).then((snapshot) => {
                    // Atualiza o registro no database com a url da imagem no storage
                    let img = {}
                    img[`/produtos/${result.key}/imagens/${indice}`] = snapshot.downloadURL
                    firebase.database().ref().update(img).then(() => resolve()).catch(() => reject())

                  }).catch((reason) => {
                    console.log("erro ao salvar o arquivo" + reason);
                    throw (reason)
                  })
              })
            }

          })
      } catch (err) {
        console.log("erro ao salvar o produto - " + err)
        reject(err)
      }
    })

  }

  private deletarImagensAntigas(produto: Produto): Observable<any> {

    return Observable.create(observer => {

      if (produto.files == undefined || produto.files.length == 0) {
        console.log("Sem novas imagens, seguindo...")
        observer.complete()
        return
      }

      let storage = firebase.storage()
      produto.imagens.forEach((imagem, indice) => {
        storage.refFromURL(imagem).delete().then((result) => {

          observer.next()

          if (indice + 1 == produto.imagens.length) {
            firebase.database().ref(`/produtos/${produto.id}/imagens`).remove().then((result) => {
              observer.complete()
              return

            }).catch(
              (err) => {
                console.log("Deu erro na hora de deletar do database")
                observer.error(err)
                return
              })
          }

        }).catch((err) => {
          observer.error(err)
          return
        })
      })
    })

  }

  public alterar(produto: Produto): Promise<any> {

    let ref = firebase.storage().ref()
    return new Promise<any>((resolve, reject) => {


      this.deletarImagensAntigas(produto).subscribe({
        complete: () => {

          let id = produto.id
          if (produto.files != undefined && produto.files.length > 0) {

            delete produto.imagens
            console.log("Deletei o atributo imagens => ", produto)
          }
          let files = produto.files
          delete produto.files
          delete produto.id
          firebase.database().ref(`/produtos/${id}`).update(produto).then((result) => {
            console.log("Salvei a imagem no database")

            if (files != undefined && files.length > 0) {

              files.forEach((imagem: File, indice) => {
                // Cria um filho no root com o id do registro criado no banco
                ref.child(`produtos/${id}/imagens/img_${indice}`)
                  .put(imagem).then((snapshot) => {
                    // Atualiza o registro no database com a url da imagem no storage
                    console.log("salvei a imagem no storage")
                    let img = {}
                    img[`/produtos/${id}/imagens/${indice}`] = snapshot.downloadURL
                    firebase.database().ref().update(img)
                      .then(result => resolve())
                      .catch(err => reject(err))

                  }).catch((reason) => {
                    console.log("erro ao salvar o arquivo" + reason);
                    reject(reason)
                  })
              })
            } else {
              resolve()
            }


          })

        },
        error: (err) => {
          reject(err)
        }
      })
    })

  }

  public listarProdutos(callback): void {

    firebase.database().ref('produtos').on('value', callback)
  }

  public obterPorId(id: string): Promise<Produto> {

    return firebase.database().ref(`produtos/${id}`).once('value').then((snapshot) => {
      let produtoFB = snapshot.val()

      let produto: Produto = new Produto(
        produtoFB.titulo,
        produtoFB.descricao,
        produtoFB.link,
        produtoFB.status
      )

      produto.id = snapshot.key
      produto.imagens = []
      produtoFB.imagens.forEach((imagemUrl, indice) => {
        produto.imagens.push(imagemUrl)
      })

      return produto
    })


  }

  public excluir(id: string): Promise<any> {
    console.log("Service - excluir")
    return new Promise((resolve, reject) => {
      firebase.database().ref(`/produtos/${id}`).once('value').then((snapshot: firebase.database.DataSnapshot) => {
        let produtoFB = snapshot.val()

        firebase.database().ref(`/produtos/${id}`).remove()
          .then(() => {
            produtoFB.imagens.forEach((imagem) => {
              firebase.storage().refFromURL(imagem).delete()
                .then(() => resolve())
                .catch(err =>{
                  console.log("Erro ao remover do storage: ", err)
                })
            })
          }).catch((err) => {
            console.log("Erro ao remover do database: ", err)
            reject(err)
          })

      })

    })

  }

}
