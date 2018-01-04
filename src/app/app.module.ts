import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';


@NgModule({
  declarations: [
    AppComponent,
    CadastroProdutosComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
