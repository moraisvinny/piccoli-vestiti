import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ProdutoService } from '../../produto.service';
import { Produto } from '../../shared/models/produto-model';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  private produtos: Produto[] = []
  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {

    this.produtoService.listarProdutos((snapshot) => {

      snapshot.forEach((snapshotChild) => {

        let produtoFB = snapshotChild.val()
        let produto: Produto = new Produto(
          produtoFB.titulo,
          produtoFB.descricao,
          produtoFB.link,
          null)
        this.produtos.push(produto)
      })

      this.dataSource = new MatTableDataSource<Produto>(this.produtos);
    })
  }

  displayedColumns = ['titulo', 'descricao', 'link', 'acao'];
  dataSource: MatTableDataSource<Produto>;

}