import { Component, OnInit  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as AOS from 'aos';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {


  public constructor(private titleService: Title) {}

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    AOS.init();
    this.titleService.setTitle('easy2edi');
  }


}
