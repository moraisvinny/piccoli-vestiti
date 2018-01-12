import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';
import { LoginAdministrativoComponent } from './area-administrativa/login-administrativo/login-administrativo.component';

@Injectable()
export class AdmAuthGuardService implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    let isAdm: boolean= this.usuarioService.isUsuarioLogadoAdm()
    if(!isAdm){
      this.route.navigate(['/adm/login'])
    }
    return isAdm
    
  }

  constructor(private usuarioService: UsuarioService, private route: Router) { }

}
