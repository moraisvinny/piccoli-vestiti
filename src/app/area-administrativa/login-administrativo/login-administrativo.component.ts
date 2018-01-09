import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-administrativo',
  templateUrl: './login-administrativo.component.html',
  styleUrls: ['./login-administrativo.component.css']
})
export class LoginAdministrativoComponent implements OnInit {

  public criarUsuario: boolean = false
  public loginForm: FormGroup
  public msgErro: string = ""

  constructor(private fb: FormBuilder) {
    this.geraForm()
  }

  ngOnInit() {
  }


  geraForm(): void {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    })

  }

  realizaLogin() {
    if(!this.validaForm()) {
      console.log("formulário inválido")
      return
    }
    console.log("Realiza Login")
  }

  validaForm(): boolean {

    this.msgErro = ""

    if(this.loginForm.value.usuario == '' || this.loginForm.value.senha == '') {
      this.msgErro = 'Preencha todos os campos'
      return false
    }

    return true
  }

  criarConta(): void {
    this.criarUsuario = true;
  }

  voltarLogin(): void {
    this.criarUsuario = false;
  }

}
