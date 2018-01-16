import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as $ from 'jquery';


import { AppComponent } from './app.component';
import { CadastroProdutosComponent } from './area-administrativa/cadastro-produtos/cadastro-produtos.component';
import { ProdutoService } from './produto.service';
import { AreaAdministrativaComponent } from './area-administrativa/area-administrativa.component';
import { LoginAdministrativoComponent } from './area-administrativa/login-administrativo/login-administrativo.component';
import { UsuarioService } from './usuario.service';
import { ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';
import { AdmAuthGuardService } from './adm-auth-guard.service';
import { LoadingModule } from 'ngx-loading';
import { ListaProdutosComponent } from './area-administrativa/lista-produtos/lista-produtos.component';


@NgModule({
  declarations: [
    AppComponent,
    CadastroProdutosComponent,
    AreaAdministrativaComponent,
    LoginAdministrativoComponent,
    HomeComponent,
    ListaProdutosComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    LoadingModule

  ],
  providers: [ProdutoService, UsuarioService, AdmAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
