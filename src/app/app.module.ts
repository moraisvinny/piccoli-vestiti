import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as $ from 'jquery';


import { AppComponent } from './app.component';
import { CadastroProdutosComponent } from './area-administrativa/cadastro-produtos/cadastro-produtos.component';
import { ProdutoService } from './produto.service';
import { AreaAdministrativaComponent } from './area-administrativa/area-administrativa.component';
import { LoginAdministrativoComponent } from './area-administrativa/login-administrativo/login-administrativo.component';
import { UsuarioService } from './usuario.service';


@NgModule({
  declarations: [
    AppComponent,
    CadastroProdutosComponent,
    AreaAdministrativaComponent,
    LoginAdministrativoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule

  ],
  providers: [ProdutoService, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
