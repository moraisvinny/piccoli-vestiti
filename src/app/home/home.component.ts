import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Produto } from '../shared/models/produto-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CaptchaService } from '../captcha.service';


interface MsgErro {
  nome: string,
  email: string,
  mensagem: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CaptchaService]
})

export class HomeComponent implements OnInit {


  public loadAPI: Promise<any>
  public produtos: Produto[] = []
  public produtoModal: Produto
  public contatoForm: FormGroup
  public msgErro: MsgErro = {nome: undefined, email: undefined,  mensagem: undefined}
  public msgContato: string


  constructor(
    private produtoService: ProdutoService,
    private fb: FormBuilder,
    private captchaService: CaptchaService) {

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
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("freelancer")) {
        isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = [
        "assets/js/freelancer.js"];

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

    this.contatoForm = this.fb.group({
      nome:["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      telefone: ["", [Validators.required]],
      mensagem: ["", [Validators.required]],
    })

    this.produtoService.listarProdutosAtivos((snapshot) => {

      this.produtos = []
      snapshot.forEach((snapshotChild) => {

        let produtoFB = snapshotChild

        let produto: Produto = new Produto(
          produtoFB.titulo,
          produtoFB.descricao,
          produtoFB.link,
          produtoFB.status)
        produto.id = snapshotChild._id
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

  private validaForm(): boolean {

    let captchaResponse = grecaptcha.getResponse();
    console.log("CAPTCHA RESPONSE: ", captchaResponse);

    let isFormValido:boolean = true
    this.msgErro = {nome: undefined, email: undefined, mensagem:undefined}

    return false;

    // if(this.contatoForm.get('nome').errors) {
    //   this.msgErro.nome = "Nome inválido"
    //   isFormValido = false
    // }

    // if(this.contatoForm.get('email').errors) {
    //   this.msgErro.email = "Email inválido"
    //   isFormValido = false
    // }

    // if(this.contatoForm.get('mensagem').errors) {
    //   this.msgErro.mensagem = "Por favor, digite uma mensagem."
    //   isFormValido = false
    // }
    // return isFormValido;

  }

  public enviaContato(): void {

    if(this.validaForm()) {

      this.msgContato = "Enviando..."

      emailjs.send("gmail", "template_4XRS9BZI", {
        nome: this.contatoForm.value.nome,
        email: this.contatoForm.value.email,
        telefone: this.contatoForm.value.telefone,
        mensagem: this.contatoForm.value.mensagem
      }).then((response) => {
        this.msgContato = "Recebemos seu contato. Em breve a gente retorna! ;)"
      })
        .catch((err) => {
          console.log("Erro ao enviar email => ", err);
          this.msgContato = "Desculpe. Tivemos um probleminha ao enviar seu contato. :("
        });

      this.contatoForm.reset();
    } else {
      this.msgContato = "Por favor, preencha corretamente o formulário. :)"
    }

  }

  public limpaErro(campo: string): void {

    this.msgErro[campo] = undefined
  }

}


