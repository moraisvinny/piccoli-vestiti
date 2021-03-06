import { Routes } from '@angular/router';
import { AreaAdministrativaComponent } from './area-administrativa/area-administrativa.component';
import { UsuarioService } from './usuario.service';
import { AppComponent } from './app.component';
import { CadastroProdutosComponent } from './area-administrativa/cadastro-produtos/cadastro-produtos.component';
import { HomeComponent } from './home/home.component';
import { AdmAuthGuardService } from './adm-auth-guard.service';
import { LoginAdministrativoComponent } from './area-administrativa/login-administrativo/login-administrativo.component';
import { ListaProdutosComponent } from './area-administrativa/lista-produtos/lista-produtos.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'adm',
        component: AreaAdministrativaComponent,
        canActivate: [AdmAuthGuardService],
        children: [
            {path: 'produtos', component: ListaProdutosComponent},
            {path: 'produto', component: CadastroProdutosComponent},            
            {path: 'produto/:id', component: CadastroProdutosComponent},
        ]
    },
    {path: 'login', component: LoginAdministrativoComponent}
]