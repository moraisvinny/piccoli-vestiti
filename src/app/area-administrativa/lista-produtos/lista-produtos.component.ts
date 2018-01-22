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

  public produtos: Produto[] = []
  private idExclusao: string
  public msg: string
  public isMsgErro: boolean = false

  public displayedColumns = ['titulo', 'link', 'status', 'acao'];
  public dataSource: MatTableDataSource<Produto>;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {

    this.listarProdutos()
  }

  public listarProdutos() {
    this.produtoService.listarProdutos((snapshot) => {
      
      this.produtos = []
      snapshot.forEach((snapshotChild) => {

        let produtoFB = snapshotChild.val()

        let produto: Produto = new Produto(
          produtoFB.titulo,
          produtoFB.descricao,
          produtoFB.link,
          produtoFB.status)
        produto.id = snapshotChild.key
        this.produtos.push(produto)
      })

      this.dataSource = new MatTableDataSource<Produto>(this.produtos);
    })
  }

  public preparaExclusao(id) {
    this.idExclusao = id
  }

  public excluir() {

    if (!this.idExclusao !== undefined) {

      this.produtoService.excluir(this.idExclusao).then((result) => {
      
        this.msg = 'Produto excluído :('
        this.isMsgErro = false
        $("#alerta").animate({ opacity: 1 }, 500);
        $("#alerta").css('position', 'relative')

        this.idExclusao = undefined

        setTimeout(() => {
          $("#alerta").animate({ opacity: 0 }, 500, () => {
            this.msg = undefined
            $("#alerta").css('position', 'absolute')
          });

        }, 2000);
      }).catch((err) => {
        this.msg = `Ocorreu o seguinte erro ao excluir: ${err}`
        this.isMsgErro = true


        $("#alerta").animate({ opacity: 1 }, 500);
        $("#alerta").css('position', 'relative')


        setTimeout(() => {
          $("#alerta").animate({ opacity: 0 }, 500, () => {
            this.msg = undefined
            this.isMsgErro = false
            $("#alerta").css('position', 'absolute')
          });

        }, 4000);
      })
    }
  }

}