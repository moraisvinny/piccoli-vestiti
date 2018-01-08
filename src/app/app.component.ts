import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

    let config = {
      apiKey: "AIzaSyBFmk-grghYp-WIs2AxYQqDEj63njES7qo",
      authDomain: "piccoli-vestiti.firebaseapp.com",
      databaseURL: "https://piccoli-vestiti.firebaseio.com",
      projectId: "piccoli-vestiti",
      storageBucket: "piccoli-vestiti.appspot.com",
      messagingSenderId: "757653763957"
    };
    firebase.initializeApp(config);
    
  }
  title = 'app';

  
}
