import { Injectable } from '@angular/core';
import { Produto } from './shared/models/produto-model';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProdutoService {
  private API_URI = 'https://piccoli-vestiti.herokuapp.com';
  //private API_URI = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  public incluir(produto: FormData): Promise<any> {
    produto.delete('id')
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.API_URI}/produtos/produto`, produto)
        .subscribe({
          next: (result: any) => {
            resolve()
          },
          error: err => {
            console.log(err)
            reject(err)
          }
        })
    })
  }

  public alterar(produto: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .put(`${this.API_URI}/produtos/produto/${produto.get('id').toString()}`, produto)
        .subscribe({
          next: (result: any) => {
            resolve()
          },
          error: err => {
            console.log(err)
            reject(err)
          }
        })
    });
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
        .subscribe(
          produto => subscriber.next(produto),
          err => subscriber.error(err))
    })
  }

  public excluir(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .delete(`${this.API_URI}/produtos/produto/${id}`)
        .subscribe(
          result => resolve(result),
          err => reject(err))

    })
  }

}
