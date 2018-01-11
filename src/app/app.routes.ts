import {  Routes } from '@angular/router';
import { AreaAdministrativaComponent } from './area-administrativa/area-administrativa.component';
import { UsuarioService } from './usuario.service';

export const ROUTES: Routes = [
    {
        path: 'adm',
        component: AreaAdministrativaComponent,
        canActivate: [UsuarioService]
    }
]