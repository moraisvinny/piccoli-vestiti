import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent implements OnInit {

  public produtoForm: FormGroup

  constructor(private fb: FormBuilder) { 
    this.geraForm();
  }

  ngOnInit() {
  }

  public geraForm(): void {
    this.produtoForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
    })
  }

  public salvarProduto(): void  {
    console.log("Salvei produto " + this.produtoForm.value.titulo);
  }

}
