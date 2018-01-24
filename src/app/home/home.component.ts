import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Produto } from '../shared/models/produto-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public loadAPI: Promise<any>;
  public produtos: Produto[]

  constructor(private produtoService: ProdutoService) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
        isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = [
        "assets/js/freelancer.js", 
        "assets/js/contact_me.min.js",
        "assets/js/jqBootstrapValidation.min.js"];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }

  ngOnInit() {
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
        produto.imagens = produtoFB.imagens
        this.produtos.push(produto)
      })
    })

  }

}


