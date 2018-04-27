import { Injectable } from '@angular/core';
import { Produto } from './shared/models/produto-model';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProdutoService {
  //private API_URI = 'https://piccoli-vestiti.herokuapp.com';
  private API_URI = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  public incluir(produto: Produto): Promise<any> {
    delete produto.id

    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.API_URI}/produtos/produto`, produto)
        .subscribe({
          next: (result: any) => {
            produto.imagens = []
            this
              .incluirImagens(result.id, produto)
              .then((imgs) => {
                produto.imagens = imgs
                this.http
                  .put(`${this.API_URI}/produtos/produto/${result.id}`, produto)
                  .subscribe({
                    next: (result: any) => {
                      resolve()
                    }
                  })
              })
          },
          error: err => {
            console.log(err)
            reject(err)
          }
        })
    })
  }

  private incluirImagens(idProduto: string, produto: Produto): Promise<any> {
    let imagensRetorno: string[] = []
    const ref = firebase.storage().ref()
    let promessas: Promise<any>[] = []

    produto.files.forEach((imagem: File, indice) => {
      promessas.push(
        ref
          .child(`produtos/${idProduto}/imagens/${indice}`)
          .put(imagem)
          .then((snapshot) => {
            imagensRetorno.push(snapshot.downloadURL)

          })
          .catch(err => { throw new Error(`Erro ao gravar imagens: ${JSON.stringify(err)}`) })
      )
    })
    return Promise.all(promessas).then(() => imagensRetorno)
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
          observer.complete()
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
          if (produto.files != undefined && produto.files.length > 0) {
            delete produto.imagens
          }
          this
            .incluirImagens(produto.id, produto)
            .then((imgs) => {
              produto.imagens = imgs
              this.http
                .put(`${this.API_URI}/produtos/produto/${produto.id}`, produto)
                .subscribe((result) => resolve(), (err) => reject(err))
            });
        }
      })
    })
  }

  public listarProdutos(callback): void {
    this.http
      .get(`${this.API_URI}/produtos`)
      .subscribe({
        next: (result) => callback(result)
      })
  }

  public listarProdutosAtivos(callback): void {
    this.http
      .get(`${this.API_URI}/produtos/ativos`)
      .subscribe({
        next: (result) => callback(result)
      })

  }

  public obterPorId(id: string): Observable<Produto> {

    return Observable.create(subscriber => {
      this.http
        .get(`${this.API_URI}/produtos/produto/${id}`)
        .map((produtoBanco: any) => {
          let produto: Produto = new Produto(
            produtoBanco.titulo,
            produtoBanco.descricao,
            produtoBanco.link,
            produtoBanco.status)
          produto.id = produtoBanco._id
          produto.imagens = []
          produto.imagens = produtoBanco.imagens
          return produto
        })
        .subscribe(produto => {
          subscriber.next(produto)
        })
    })
  }

  public excluir(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(`${this.API_URI}/produtos/produto/${id}`)
        .subscribe((produto: any) => {
          this
            .deletarImagensAntigas(produto)
            .subscribe((result) => {
              this.http
                .delete(`${this.API_URI}/produtos/produto/${id}`)
                .subscribe((result) => resolve(), (err) => reject(err))
            })
        }, (err) => reject(err))
    })
  }

}
