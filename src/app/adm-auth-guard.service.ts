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

    return new Promise((resolve, reject) => {
      this.usuarioService.isUsuarioLogadoAdm().then((resposta) => {
        console.log("resposta - ", resposta)
        resolve(resposta)
      }).catch((reason) => {
        console.log("Erro retornado do usuarioService = ", reason)
        this.route.navigate(['/login'])
        reject(reason)
      })
    }).then(() => true, (reason) => false)


  }

  constructor(private usuarioService: UsuarioService, private route: Router) { }

}
