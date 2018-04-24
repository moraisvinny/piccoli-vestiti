import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../shared/models/produto-model';
import { ProdutoService } from '../../produto.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent implements OnInit {

  public produtoForm: FormGroup
  public imagens: File[] = []
  public arquivoInvalido: boolean
  public quantidadeArquivosInvalida: boolean
  public msgErro: string
  public salvouSucesso: boolean
  public urls: any[]
  public isLoading: boolean = false
  public produto: Produto = new Produto('', '', '', 'edicao')


  constructor(private route: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private produtoService: ProdutoService) {
    this.geraForm();
  }

  ngOnInit() {
    this.isLoading = true
    this.activatedRoute.params.subscribe({
      next: (parametros) => {
        if (parametros.id) {

          this.produtoService.obterPorId(parametros.id).subscribe((produto: Produto) => {

            this.produto = produto
            this.urls = produto.imagens

            this.geraForm()
            this.isLoading = false

          });
        } else {
          this.isLoading = false
        }
      },
      error: (err) => {
        console.log("ERRO ", err)
      }
    })
  }

  public isValidForm(): boolean {

    return this.produtoForm.valid
      && this.urls != undefined
      && this.urls.length > 0
      && !this.arquivoInvalido
      && !this.quantidadeArquivosInvalida
  }

  public geraForm(): void {
    this.produtoForm = this.fb.group({
      titulo: [this.produto.titulo, Validators.required],
      descricao: [this.produto.descricao, Validators.required],
      link: [this.produto.link, Validators.required],
      status: [this.produto.status]
    })
  }

  public salvarProduto(): void {

    $('html,body').scrollTop(0);
    this.isLoading = true

    console.log("Salvar produto - Component " + this.produtoForm.value.titulo)

    this.produto = this.popularProduto();

    if (this.produto.id != undefined) {
      console.log("TEM ID, PRECISO ATUALIZAR")
      this.produtoService.alterar(this.popularProduto()).then(() => this.finalizaEdicao())
    } else {
      console.log("NÂO TEM ID, VOU INCLUIR")
      this.produtoService.incluir(this.produto)
        .then(() => this.finalizaEdicao())
        .catch((erro: any) => {
          console.log(erro)

          this.msgErro = "Erro ao salvar o produto"
          this.isLoading = false
          return

        })
    }

  }

  private finalizaEdicao(): void {
    this.isLoading = false
    this.salvouSucesso = true
    setTimeout(() => {
      this.salvouSucesso = false
      this.produtoForm.reset();
      this.urls = [];
      $('#imagem1').val('')
      this.route.navigate(['/adm/produtos'])
    }, 1500);
  }

  public popularProduto(): Produto {
    let produto = new Produto(
      this.produtoForm.value.titulo,
      this.produtoForm.value.descricao,
      this.produtoForm.value.link,
      this.produtoForm.value.status
    )

    produto.id = this.produto.id
    produto.imagens = this.produto.imagens
    produto.files = this.imagens
    return produto

  }

  public populaArquivos(event: Event): void {

    this.quantidadeArquivosInvalida = false
    this.imagens = []
    this.urls = []
    let arquivos: FileList = (<HTMLInputElement>event.target).files;
    if (arquivos.length > 2) {
      this.quantidadeArquivosInvalida = true
      return
    }
    this.arquivoInvalido = false
    for (let i = 0; i < arquivos.length; i++) {
      if (!this.isTipoArquivoValido(arquivos[i])) {
        this.arquivoInvalido = true
        return
      }

      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.urls[i] = event.target.result;
      }

      reader.readAsDataURL((<HTMLInputElement>event.target).files[i]);


      this.imagens.push(arquivos[i])
    }



  }

  public isTipoArquivoValido(file: File): boolean {

    return file != undefined && file.type.startsWith("image")

  }
}
