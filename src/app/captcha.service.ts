
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CaptchaService {

  private api: string = "https://piccoli-vestiti.herokuapp.com/captcha"
  //private api: string = "http://localhost:5000/captcha"
  constructor(private http: HttpClient) { }

  public validaCaptcha (response: string) : Observable<any>{

    return this.http
      .post(
        this.api,{captchaResponse: response},
        {headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })})
  }

}
