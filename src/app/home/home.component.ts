import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Produto } from '../shared/models/produto-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public loadAPI: Promise<any>
  public produtos: Produto[] = []
  public produtoModal: Produto
  public contatoForm: FormGroup

  constructor(private produtoService: ProdutoService, private fb: FormBuilder) {

    let produtoInicial = new Produto("", "", "", "")
    produtoInicial.imagens = [""]

    this.produtos.push(produtoInicial)
    this.produtoModal = produtoInicial


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

    emailjs.init("user_PDafcdu4DrQAbTzFfhmzj");

    this.fb.group({
      nome:["", [Validators.required, Validators.minLength(3)]],
      email: "",
      telefone: "",
      mensagem: "",
    })

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

  public popularModal(produto: Produto) {
    this.produtoModal = produto
  }

  public abreLink(link: string): void {

    window.open(link, '_blank')
  }

  public enviaContato(): void {

    emailjs.send("gmail", "template_4XRS9BZI", {
      nome: "TESTE VINICIUS",
      email: "TESTE@TESTE",
      telefone: "1234",
      mensagem: "Mensagem de teste"
    }).then((response) => {
      console.log("Deu certo!");
    })
      .catch((err) => {
        console.log("Deu erro!");
      });
  }

}


