import { Component, OnInit  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as AOS from 'aos';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {


  public constructor(private titleService: Title, private db: AngularFirestore) {
      // const users = db.collection('users').valueChanges();
      // users.subscribe(console.log);
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    AOS.init();
    this.titleService.setTitle('easy2edi');
  }


}
