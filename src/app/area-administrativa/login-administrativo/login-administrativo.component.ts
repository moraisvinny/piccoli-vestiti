import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../usuario.service';
import { Usuario } from '../../shared/models/usuario.model';


@Component({
  selector: 'app-login-administrativo',
  templateUrl: './login-administrativo.component.html',
  styleUrls: ['./login-administrativo.component.css']
})
export class LoginAdministrativoComponent implements OnInit {

  public criarUsuario: boolean = false
  public loginForm: FormGroup
  public criaUsuarioForm: FormGroup
  public msg: string = ""
  public usuarioCriadoSucesso: boolean = false

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.geraForms()
  }

  ngOnInit() {
  }


  geraForms(): void {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    })

    this.criaUsuarioForm = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      senhaRepetida: ['', Validators.required]
    })

  }

  realizaLogin() {
    if (!this.isFormularioLoginValido()) {
      console.log("formulário inválido")
      return
    }
    console.log("Realiza Login")
  }

  isFormularioLoginValido(): boolean {

    this.msg = ""

    if (this.loginForm.value.usuario == '' || this.loginForm.value.senha == '') {
      this.msg = 'Preencha todos os campos'
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

  isSenhaValida(): boolean {

    return this.criaUsuarioForm.value.senha === this.criaUsuarioForm.value.senhaRepetida
  }

  isFormularioCriacaoValido(): boolean {
    this.msg = ""
    if (this.criaUsuarioForm.invalid) {
      this.msg = 'Preencha corretamente todos os campos'
      return false
    }

    if (!this.isSenhaValida()) {
      this.msg = 'As senhas informadas não são iguais'
      return false
    }

    return true;
  }

  salvarUsuario(): void {

    if (this.isFormularioCriacaoValido()) {

      console.log("Vou salvar a senha")
      let usuario: Usuario = new Usuario(
        this.criaUsuarioForm.value.usuario,
        this.criaUsuarioForm.value.email,
        this.criaUsuarioForm.value.senha,
        'ADM'
      )

      this.usuarioService.incluirUsuarioAdministrativo(usuario)
        .then((retorno) => {
          this.usuarioCriadoSucesso = true
          this.msg = "Usuário criado com sucesso!"
          setTimeout(() => {
            this.usuarioCriadoSucesso = false
            this.msg = ""
            this.voltarLogin()
          }, 2000);
        }).catch((reason) => {
          console.log("Erro ao criar Usuario")
          this.usuarioCriadoSucesso = false
          this.msg = "Erro ao criar Usuário"
        })
    }

  }

}
