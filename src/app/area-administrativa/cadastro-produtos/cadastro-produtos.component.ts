import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../shared/models/produto-model';
import { ProdutoService } from '../../produto.service'

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


  constructor(private fb: FormBuilder, private produtoService: ProdutoService) {
    this.geraForm();
  }

  ngOnInit() {
  }

  public isValidForm(): boolean {

    return this.produtoForm.valid
      && this.imagens.length > 0
      && this.imagens.length < 3
      && !this.arquivoInvalido
      && !this.quantidadeArquivosInvalida
  }

  public geraForm(): void {
    this.produtoForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      link: ['', Validators.required]
    })
  }

  public salvarProduto(): void {
    console.log("Salvar produto - Component " + this.produtoForm.value.titulo)

    let produto: Produto = this.popularProduto();
    this.produtoService.incluir(produto, (erro: any) => {
      console.log(erro)
      if (erro != undefined) {
        this.msgErro = "Erro ao salvar o produto"
        return
      }
    })
    this.produtoForm.reset();
    this.urls = [];
    $('#imagem1').val('')
    this.salvouSucesso = true
    setTimeout(() => {
      this.salvouSucesso = false
    }, 5000);
  }

  public popularProduto(): Produto {
    return new Produto(
      this.produtoForm.value.titulo,
      this.produtoForm.value.descricao,
      this.produtoForm.value.link,
      this.imagens
    )

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
    
        reader.onload = (event:any) => {
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