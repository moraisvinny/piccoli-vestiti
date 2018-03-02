
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CaptchaService {

  private api: string = "https://www.google.com/recaptcha/api/siteverify"
  private secret: string = "6Lf0E0oUAAAAAOlAIN9sTNF9hyVGpG2cPYG7SLi6"

  constructor(private http: HttpClient) { }

  public validarCaptcha(response: string) {
    this.http
      .post(this.api, {secret: this.secret, response: response})
      .subscribe({
        next: (result)=>console.log(result)
      });
  }

}
